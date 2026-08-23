-- MATRIXA Initial Schema
-- Supports Multi-Tenancy (Organization Isolation) via RLS

-- 1. Organizations (Tenants)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Organization Users (Link Auth Users to Organizations & Roles)
CREATE TABLE IF NOT EXISTS public.organization_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- References auth.users(id)
    role VARCHAR(50) NOT NULL, -- e.g. HOD, Engineering Manager, Design Engineer
    department VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 3. Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    project_code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    customer VARCHAR(255),
    project_manager UUID REFERENCES public.organization_users(id),
    start_date DATE,
    target_date DATE,
    progress DECIMAL(5,2) DEFAULT 0,
    health VARCHAR(20) DEFAULT 'success', -- success, warning, critical
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, project_code)
);

-- 4. Activities (The L2 Schedule Backbone)
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    activity_code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100) NOT NULL, -- Engineering, Procurement, MFC
    assigned_to UUID REFERENCES public.organization_users(id),
    planned_start DATE,
    planned_finish DATE,
    actual_start DATE,
    actual_finish DATE,
    progress DECIMAL(5,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Pending',
    delay_days INTEGER DEFAULT 0,
    delay_reason TEXT,
    external_source VARCHAR(50), -- e.g. EXCEL
    external_record_id VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, project_id, activity_code)
);

-- 5. Excel Sync History
CREATE TABLE IF NOT EXISTS public.excel_syncs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    sync_code VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    records_processed INTEGER DEFAULT 0,
    records_created INTEGER DEFAULT 0,
    records_updated INTEGER DEFAULT 0,
    records_rejected INTEGER DEFAULT 0,
    conflicts INTEGER DEFAULT 0,
    status VARCHAR(50) NOT NULL,
    created_by UUID REFERENCES public.organization_users(id)
);

-- Setup Row Level Security (RLS) for Organization Isolation

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.excel_syncs ENABLE ROW LEVEL SECURITY;

-- Note: RLS Policies would typically extract the user's organization_id from the JWT claims.
-- Since this is a prototype, we apply foundational policies.

CREATE POLICY "Users can view their own organization" 
    ON public.organizations FOR SELECT 
    USING (id IN (SELECT organization_id FROM public.organization_users WHERE user_id = auth.uid()));

-- Repeat for all tables...
