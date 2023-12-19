import { IconMapKey } from '../../../components/NavbarLinksGroup/NavbarLinksGroup';

export type ResourceType = 'C' | 'R' | 'F';

export interface ResourceTable extends ResourceInterface {
  id: string;
  actions: ResourceInterface;
}

export interface ResourceInterface {
  resourceId: string;
  resourceName: string;
  resourcePerms?: string;
  parentId: string;
  resourceLevel: number;
  resourcePath?: string;
  resourceParams?: string;
  resourceType: ResourceType;
  resourceIcon?: string;
  effective: number;
  children: ResourceInterface[];
}

export interface ResourceResponse {
  code: number;
  data: ResourceInterface[];
  message: string;
}
