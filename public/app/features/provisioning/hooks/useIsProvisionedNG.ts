import { config } from '@grafana/runtime';
import { useGetFrontendSettingsQuery } from 'app/api/clients/provisioning';

import { DashboardScene } from '../../dashboard-scene/scene/DashboardScene';

import { useGetResourceRepository } from './useGetResourceRepository';

export function useIsProvisionedNG(dashboard: DashboardScene): boolean {
  const params = new URLSearchParams(window.location.search);
  const folderUid = params.get('folderUid') || undefined;

  const folderRepository = useGetResourceRepository({ folderUid });
  const { data } = useGetFrontendSettingsQuery();

  if (!config.featureToggles.provisioning) {
    return false;
  }
  return (
    dashboard.isManagedRepository() ||
    Boolean(folderRepository) ||
    Boolean(data?.items.some((item) => item.target === 'instance'))
  );
}
