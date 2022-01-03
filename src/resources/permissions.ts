import { AxiosInstance } from 'axios';
import utils from '../utils';

export enum PermissionsValue {
  admin = 'admin',
  profileAdmin = 'profileadmin',
  gateAdmin = 'gateadmin',
  scan = 'scan',
  provisioning = 'provisioning',
  codeViewer = 'codeviewer',
  issueAdmin = 'issueadmin',
  securityHotspotAdmin = 'securityhotspotadmin',
  user = 'user',
}

export default class Permissions {
  instance: AxiosInstance;

  readonly path = 'permissions';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  addGroup(
    permission: PermissionsValue,
    groupId?: string,
    groupName?: string,
    organization?: string,
    projectId?: string,
    projectKey?: string,
  ) {
    return this.instance.post(`${this.path}/add_group`, utils.objectToPostParam({
      permission,
      groupId,
      groupName,
      organization,
      projectId,
      projectKey,
    }));
  }

  addGroupToTemplate(
    permission: PermissionsValue,
    groupId?: string,
    groupName?: string,
    organization?: string,
    templateId?: string,
    templateName?: string,
  ) {
    return this.instance.post(`${this.path}/add_group_to_template`, utils.objectToPostParam({
      permission,
      groupId,
      groupName,
      organization,
      templateId,
      templateName,
    }));
  }

  addProjectCreatorToTemplate(
    permission: PermissionsValue,
    organization?: string,
    templateId?: string,
    templateName?: string,
  ) {
    return this.instance.post(`${this.path}/add_project_creator_to_template`, utils.objectToPostParam({
      permission, organization, templateId, templateName,
    }));
  }

  addUser(
    permission: PermissionsValue,
    login: string,
    organization: string,
    projectId?: string,
    projectKey?: string,
  ) {
    return this.instance.post(`${this.path}/add_user`, utils.objectToPostParam({
      permission, login, organization, projectId, projectKey,
    }));
  }

  addUserToTemplate(
    permission: PermissionsValue,
    login: string,
    organization?: string,
    templateId?: string,
    templateName?: string,
  ) {
    return this.instance.post(`${this.path}/add_user_to_template`, utils.objectToPostParam({
      permission, login, organization, templateId, templateName,
    }));
  }

  applyTemplate(
    organization?: string,
    projectId?: string,
    projectKey?: string,
    templateId?: string,
    templateName?: string,
  ) {
    return this.instance.post(`${this.path}/apply_template`, utils.objectToPostParam({
      organization, projectId, projectKey, templateId, templateName,
    }));
  }

  bulkApplyTemplate(
    analyzedBefore?: string,
    onProvisionedOnly?: string,
    organization?: string,
    projects?: string[],
    q?: string,
    templateId?: string,
    templateName?: string,
    qualifiers = 'TRK',
  ) {
    return this.instance.post(`${this.path}/bulk_apply_template`, utils.objectToPostParam({
      analyzedBefore,
      onProvisionedOnly,
      organization,
      projects: (typeof projects !== 'undefined' && projects.length > 0) ? projects.join(',') : undefined,
      q,
      templateId,
      templateName,
      qualifiers,
    }));
  }

  createTemplate(
    name: string,
    description?: string,
    organization?: string,
    projectKeyPattern?: string,
  ) {
    return this.instance.post(`${this.path}/create_template`, utils.objectToPostParam({
      name, description, organization, projectKeyPattern,
    }));
  }

  deleteTemplate(organization?: string, templateId?: string, templateName?: string) {
    return this.instance.post(`${this.path}/delete_template`, utils.objectToPostParam({
      organization, templateId, templateName,
    }));
  }

  removeGroup(
    permission: PermissionsValue,
    groupId?: string,
    groupName?: string,
    organization?: string,
    projectId?: string,
    projectKey?: string,
  ) {
    return this.instance.post(`${this.path}/remove_group`, utils.objectToPostParam({
      permission, groupId, groupName, organization, projectId, projectKey,
    }));
  }

  removeGroupFromTemplate(
    permission: PermissionsValue,
    groupId?: string,
    groupName?: string,
    organization?: string,
    templateId?: string,
    templateName?: string,
  ) {
    return this.instance.post(`${this.path}/remove_group_from_template`, utils.objectToPostParam({
      permission, groupId, groupName, organization, templateId, templateName,
    }));
  }

  removeProjectCreatorFromTemplate(
    permission: PermissionsValue,
    organization?: string,
    templateId?: string,
    templateName?: string,
  ) {
    return this.instance.post(`${this.path}/remove_project_creator_from_template`, utils.objectToPostParam({
      permission, organization, templateId, templateName,
    }));
  }

  removeUser(
    permission: PermissionsValue,
    login: string,
    organization: string,
    projectId?: string,
    projectKey?: string,
  ) {
    return this.instance.post(`${this.path}/remove_user`, utils.objectToPostParam({
      permission, login, organization, projectId, projectKey,
    }));
  }

  removeUserFromTemplate(
    permission: PermissionsValue,
    login: string,
    organization?: string,
    templateId?: string,
    templateName?: string,
  ) {
    return this.instance.post(`${this.path}/remove_user_from_template`, utils.objectToPostParam({
      permission, login, organization, templateId, templateName,
    }));
  }

  searchTemplates(organization?: string, q?: string) {
    return this.instance.get(`${this.path}/search_templates`, { params: { organization, q } });
  }

  setDefaultTemplate(
    organization?: string,
    templateId?: string,
    templateName?: string,
    qualifier = 'TRK',
  ) {
    return this.instance.post(`${this.path}/set_default_template`, utils.objectToPostParam({
      organization, templateId, templateName, qualifier,
    }));
  }

  updateTemplate(id: string, description?: string, name?: string, projectKeyPattern?: string) {
    return this.instance.post(`${this.path}/update_template`, utils.objectToPostParam({
      id, description, name, projectKeyPattern,
    }));
  }
}
