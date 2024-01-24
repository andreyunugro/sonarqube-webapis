import { AxiosInstance } from 'axios';
import utils from '../utils';
import {
  SonarFacets, SonarIssuesSeverity, SonarOWASPTop10,
  SonarSANSTop25, SonarSourceSecurity, SonarType,
} from '../enums';

export enum IssuesTransition {
  confirm = 'confirm',
  unconfirm = 'unconfirm',
  reopen = 'reopen',
  resolve = 'resolve',
  falsepositive = 'falsepositive',
  wontfix = 'wontfix',
  close = 'close',
  setinreview = 'setinreview',
  resolveasreviewed = 'resolveasreviewed',
  resetastoreview = 'resetastoreview',
}

export enum IssuesAdditionalFields {
  all = '_all',
  comments = 'comments',
  languages = 'languages',
  actionPlans = 'actionPlans',
  rules = 'rules',
  transitions = 'transitions',
  actions = 'actions',
  users = 'users',
}

export enum IssuesFacet {
  projects = 'projects',
  moduleUuids = 'moduleUuids',
  fileUuids = 'fileUuids',
  assignedToMe = 'assigned_to_me',
  resolutions = 'resolutions',
  rules = 'rules',
  assignees = 'assignees',
  authors = 'authors',
  author = 'author',
  directories = 'directories',
  createdAt = 'createdAt',
}

export enum IssuesResolution {
  falsePositive = 'FALSE-POSITIVE',
  wontFix = 'WONTFIX',
  fixed = 'FIXED',
  removed = 'REMOVED',
}

export enum IssuesSort {
  creationDate = 'CREATION_DATE',
  updateDate = 'UPDATE_DATE',
  closeDate = 'CLOSE_DATE',
  assignee = 'ASSIGNEE',
  severity = 'SEVERITY',
  status = 'STATUS',
  fileLine = 'FILE_LINE',
  hotspots = 'HOTSPOTS',
}

export enum IssuesStatus {
  open = 'OPEN',
  confirmed = 'CONFIRMED',
  reopened = 'REOPENED',
  resolved = 'RESOLVED',
  closed = 'CLOSED',
}

export default class Issues {
  instance: AxiosInstance;

  readonly path = 'issues';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  addComment(issue: string, text: string, isFeedback = false) {
    return this.instance.post(`${this.path}/add_comment`, utils.objectToPostParam({
      issue, text, isFeedback: isFeedback.toString(),
    }));
  }

  assign(issue: string, assignee?: string) {
    return this.instance.post(`${this.path}/assign`, utils.objectToPostParam({
      issue, assignee,
    }));
  }

  authors(organization: string, project?: string, q?: string, ps = 10) {
    return this.instance.get(`${this.path}/authors`, {
      params: {
        organization, project, q, ps,
      },
    });
  }

  bulkChange(
    issues: string[],
    addTags?: string,
    assign?: string,
    comment?: string,
    doTransition?: IssuesTransition,
    removeTags?: string,
    setSeverity?: SonarIssuesSeverity,
    setType?: SonarType,
    sendNotifications = false,
  ) {
    return this.instance.post(`${this.path}/bulk_change`, utils.objectToPostParam({
      issues: issues.join(','),
      addTags,
      assign,
      comment,
      do_transition:doTransition,
      removeTags,
      setSeverity,
      setType,
      sendNotifications: sendNotifications.toString(),
    }));
  }

  changelog(issue: string) {
    return this.instance.get(`${this.path}/changelog`, {
      params: { issue },
    });
  }

  deleteComment(comment: string) {
    return this.instance.post(`${this.path}/delete_comment`, utils.objectToPostParam({ comment }));
  }

  doTransition(issue: string, transition: IssuesTransition) {
    return this.instance.post(`${this.path}/do_transition`, utils.objectToPostParam({ issue, transition }));
  }

  editComment(comment: string, text: string) {
    return this.instance.post(`${this.path}/edit_comment`, utils.objectToPostParam({ comment, text }));
  }

  search(
    issues?: string[],
    organization?: string,
    additionalFields?: IssuesAdditionalFields,
    assigned?: boolean,
    assignees?: string[],
    author?: string,
    branch?: string,
    componentKeys?: string[],
    createdAfter?: string,
    createdAt?: string,
    createdBefore?: string,
    createdInLast?: string,
    cwe?: string[],
    facets?: IssuesFacet[] | SonarFacets[],
    languages?: string[],
    owaspTop10?: SonarOWASPTop10[],
    pullRequest?: string,
    resolutions?: IssuesResolution[],
    resolved?: boolean,
    rules?: string[],
    s?: IssuesSort,
    sansTop25?: SonarSANSTop25[],
    severities?: SonarIssuesSeverity[],
    sonarsourceSecurity?: SonarSourceSecurity[],
    statuses?: IssuesStatus[],
    tags?: string[],
    types?: SonarType[],
    asc = true,
    onComponentOnly = false,
    p = 1,
    ps = 100,
    sinceLeakPeriod = false,
  ) {
    const params: { [k: string]: unknown } = {
      issues: (typeof issues !== 'undefined' && issues.length > 0) ? issues.join(',') : undefined,
      organization,
      additionalFields,
      assigned,
      assignees: (typeof assignees !== 'undefined' && assignees.length > 0) ? assignees.join(',') : undefined,
      author,
      branch,
      componentKeys: (typeof componentKeys !== 'undefined' && componentKeys.length > 0) ? componentKeys.join(',') : undefined,
      createdAfter,
      createdAt,
      createdBefore,
      createdInLast,
      cwe: (typeof cwe !== 'undefined' && cwe.length > 0) ? cwe.join(',') : undefined,
      facets: (typeof facets !== 'undefined' && facets.length > 0) ? facets.join(',') : undefined,
      languages: (typeof languages !== 'undefined' && languages.length > 0) ? languages.join(',') : undefined,
      owaspTop10: (typeof owaspTop10 !== 'undefined' && owaspTop10.length > 0) ? owaspTop10.join(',') : undefined,
      pullRequest,
      resolutions: (typeof resolutions !== 'undefined' && resolutions.length > 0) ? resolutions.join(',') : undefined,
      resolved,
      rules: (typeof rules !== 'undefined' && rules.length > 0) ? rules.join(',') : undefined,
      s,
      sansTop25: (typeof sansTop25 !== 'undefined' && sansTop25.length > 0) ? sansTop25.join(',') : undefined,
      severities: (typeof severities !== 'undefined' && severities.length > 0) ? severities.join(',') : undefined,
      sonarsourceSecurity: (typeof sonarsourceSecurity !== 'undefined' && sonarsourceSecurity.length > 0) ? sonarsourceSecurity.join(',') : undefined,
      statuses: (typeof statuses !== 'undefined' && statuses.length > 0) ? statuses.join(',') : undefined,
      tags: (typeof tags !== 'undefined' && tags.length > 0) ? tags.join(',') : undefined,
      types: (typeof types !== 'undefined' && types.length > 0) ? types.join(',') : undefined,
      asc,
      onComponentOnly,
      p,
      ps,
      sinceLeakPeriod,
    };
    Object.keys(params)
      .forEach((k: string) => (params[k] === undefined && delete params[k]));
    return this.instance.get(`${this.path}/search`, { params });
  }

  setSeverity(issue: string, severity: SonarIssuesSeverity) {
    return this.instance.post(`${this.path}/set_severity`, utils.objectToPostParam({ issue, severity }));
  }

  setTags(issue: string, tags: string[]) {
    return this.instance.post(`${this.path}/set_tags`, utils.objectToPostParam({ issue, tags: tags.join(',') }));
  }

  setType(issue: string, type: SonarType) {
    return this.instance.post(`${this.path}/set_type`, utils.objectToPostParam({ issue, type }));
  }

  tags(organization?: string, project?: string, q?: string, ps = 10) {
    return this.instance.get(`${this.path}/tags`, {
      params: {
        organization,
        project,
        q,
        ps,
      },
    });
  }
}
