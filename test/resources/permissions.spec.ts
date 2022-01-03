import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import Permissions, { PermissionsValue } from '../../src/resources/permissions';

describe('Permissions', () => {
  const axiosInstance = axios.create();
  const sandbox = sinon.createSandbox();
  const path = 'permissions';

  after(() => {
    sandbox.restore();
  });

  it('should set instance property', () => {
    const init = new Permissions(axiosInstance);
    expect(init).to.have.property('instance', axiosInstance);
    expect(init).to.respondTo('addGroup');
    expect(init).to.respondTo('addGroupToTemplate');
    expect(init).to.respondTo('addProjectCreatorToTemplate');
    expect(init).to.respondTo('addUser');
    expect(init).to.respondTo('addUserToTemplate');
    expect(init).to.respondTo('applyTemplate');
    expect(init).to.respondTo('bulkApplyTemplate');
    expect(init).to.respondTo('createTemplate');
    expect(init).to.respondTo('deleteTemplate');
    expect(init).to.respondTo('removeGroup');
    expect(init).to.respondTo('removeGroupFromTemplate');
    expect(init).to.respondTo('removeProjectCreatorFromTemplate');
    expect(init).to.respondTo('removeUser');
    expect(init).to.respondTo('removeUserFromTemplate');
    expect(init).to.respondTo('searchTemplates');
    expect(init).to.respondTo('setDefaultTemplate');
    expect(init).to.respondTo('updateTemplate');
  });

  it('should post correct add group', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.addGroup(PermissionsValue.admin);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_group`, `permission=${PermissionsValue.admin}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct add group to template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.addGroupToTemplate(PermissionsValue.admin);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_group_to_template`, `permission=${PermissionsValue.admin}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct add project creator to template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.addProjectCreatorToTemplate(PermissionsValue.admin);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_project_creator_to_template`, `permission=${PermissionsValue.admin}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct add user', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.addUser(PermissionsValue.admin, 'g.hopper', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_user`, `permission=${PermissionsValue.admin}&login=g.hopper&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct add user to template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.addUserToTemplate(PermissionsValue.admin, 'g.hopper');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/add_user_to_template`, `permission=${PermissionsValue.admin}&login=g.hopper`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct apply template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.applyTemplate();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/apply_template`, '')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct bulk apply template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.bulkApplyTemplate();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/bulk_apply_template`, 'qualifiers=TRK')).to.equal(true);

    const nextResult = await perm.bulkApplyTemplate(undefined, undefined, undefined, ['my_project', 'another_project']);
    expect(nextResult).to.deep.equal(stubResult);
    expect(stubPost.calledWithExactly(`${path}/bulk_apply_template`, 'projects=my_project%2Canother_project&qualifiers=TRK')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct create template', async () => {
    const stubResult = {
      status: 200,
      data: {
        permissionTemplate: {
          name: 'Finance',
          description: 'Permissions for financially related projects',
          projectKeyPattern: '.*\\.finance\\..*',
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.createTemplate('Financial Service Permissions');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/create_template`, 'name=Financial+Service+Permissions')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct delete template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.deleteTemplate();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/delete_template`, '')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct remove group', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.removeGroup(PermissionsValue.admin);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove_group`, `permission=${PermissionsValue.admin}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct remove group from template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.removeGroupFromTemplate(PermissionsValue.codeViewer);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove_group_from_template`, `permission=${PermissionsValue.codeViewer}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct remove project creator from template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.removeProjectCreatorFromTemplate(PermissionsValue.gateAdmin);
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove_project_creator_from_template`, `permission=${PermissionsValue.gateAdmin}`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct remove user', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.removeUser(PermissionsValue.issueAdmin, 'g.hopper', 'my-org');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove_user`, `permission=${PermissionsValue.issueAdmin}&login=g.hopper&organization=my-org`)).to.equal(true);
    stubPost.restore();
  });

  it('should post correct remove user from template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.removeUserFromTemplate(PermissionsValue.profileAdmin, 'g.hopper');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/remove_user_from_template`, `permission=${PermissionsValue.profileAdmin}&login=g.hopper`)).to.equal(true);
    stubPost.restore();
  });

  it('should get correct search templates', async () => {
    const stubResult = { status: 200, data: '' };
    const stubGet = sandbox.stub(axiosInstance, 'get').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.searchTemplates();
    expect(result).to.deep.equal(stubResult);
    expect(stubGet.calledOnceWithExactly(`${path}/search_templates`, {
      params: { organization: undefined, q: undefined },
    })).to.equal(true);
    stubGet.restore();
  });

  it('should post correct set default template', async () => {
    const stubResult = { status: 200, data: '' };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.setDefaultTemplate();
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/set_default_template`, 'qualifier=TRK')).to.equal(true);
    stubPost.restore();
  });

  it('should post correct update template', async () => {
    const stubResult = {
      status: 200,
      data: {
        permissionTemplate: {
          id: 'af8cb8cc-1e78-4c4e-8c00-ee8e814009a5',
          name: 'Finance',
          description: 'Permissions for financially related projects',
          projectKeyPattern: '.*\\.finance\\..*',
          createdAt: '2001-09-09T03:46:40+0200',
          updatedAt: '2015-08-25T16:18:48+0200',
        },
      },
    };
    const stubPost = sandbox.stub(axiosInstance, 'post').resolves(stubResult);
    const perm = new Permissions(axiosInstance);
    const result = await perm.updateTemplate('af8cb8cc-1e78-4c4e-8c00-ee8e814009a5');
    expect(result).to.deep.equal(stubResult);
    expect(stubPost.calledOnceWithExactly(`${path}/update_template`, 'id=af8cb8cc-1e78-4c4e-8c00-ee8e814009a5')).to.equal(true);
    stubPost.restore();
  });
});
