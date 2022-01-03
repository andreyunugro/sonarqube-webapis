import { AxiosInstance } from 'axios';
import {
  SonarFacets, SonarInheritance, SonarIssuesSeverity, SonarOWASPTop10,
  SonarSANSTop25, SonarSortField, SonarSourceSecurity, SonarStatus,
  SonarType,
} from '../enums';
import utils from '../utils';

export enum RulesField {
  actives = 'actives',
  createdAt = 'createdAt',
  debtOverloaded = 'debtOverloaded',
  debtRemFn = 'debtRemFn',
  defaultDebtRemFn = 'defaultDebtRemFn',
  defaultRemFn = 'defaultRemFn',
  deprecatedKeys = 'deprecatedKeys',
  effortToFixDescription = 'eff    ortToFixDescription',
  gapDescription = 'gapDescription',
  htmlDesc = 'htmlDesc',
  htmlNote = 'htmlNote',
  internalKey = 'internalKey',
  isExternal = 'isExternal',
  isTemplate = 'isTemplate',
  lang = 'lang',
  langName = 'langName',
  mdDesc = 'mdDesc',
  mdNote = 'mdNote',
  name = 'name',
  noteLogin = 'noteLogin',
  params = 'params',
  remFn = 'remFn',
  remFnOverloaded = 'remFnOverloaded',
  repo = 'repo',
  scope = 'scope',
  severity = 'severity',
  status = 'status',
  sysTags = 'sysTags',
  tags = 'tags',
  templateKey = 'templateKey',
  updatedAt = 'updatedAt',
}

export enum RulesFacets {
  repositories = 'repositories',
  activeSeverities = 'active_severities',
  true = 'true',
}

export enum RulesTypes {
  securityHotspot = 'SECURITY_HOTSPOT',
}

export enum RulesRemediationFnType {
  linear = 'LINEAR',
  linearOffset = 'LINEAR_OFFSET',
  constantIssue = 'CONSTANT_ISSUE',
}

export default class Rules {
  instance: AxiosInstance;

  readonly path = 'rules';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  repositories(language?:string, q?: string) {
    return this.instance.get(`${this.path}/repositories`, {
      params: { language, q },
    });
  }

  search(
    activation?: boolean,
    activeSeverities?: SonarIssuesSeverity[],
    availableSince?: string,
    cwe?: string[],
    f?: RulesField[],
    facets?: RulesFacets[] | SonarFacets[],
    inheritance?: SonarInheritance[],
    isTemplate?: boolean,
    languages?: string[],
    organization?: string,
    owaspTop10?: SonarOWASPTop10[],
    q?: string,
    qprofile?: string,
    repositories?: string[],
    ruleKey?: string,
    ruleKeys?: string[],
    s?: SonarSortField,
    sansTop25?: SonarSANSTop25[],
    severities?: SonarIssuesSeverity[],
    sonarsourceSecurity?: SonarSourceSecurity[],
    statuses?: SonarStatus[],
    tags?: string[],
    templateKey?: string,
    types?: SonarType[] | RulesTypes[],
    asc = true,
    includeExternal = false,
    p = 1,
    ps = 100,
  ) {
    return this.instance.get(`${this.path}/search`, {
      params: {
        activation,
        active_severities: (typeof activeSeverities !== 'undefined' && activeSeverities.length > 0) ? activeSeverities.join(',') : undefined,
        available_since: availableSince,
        cwe: (typeof cwe !== 'undefined' && cwe.length > 0) ? cwe.join(',') : undefined,
        f: (typeof f !== 'undefined' && f.length > 0) ? f.join(',') : undefined,
        facets: (typeof facets !== 'undefined' && facets.length > 0) ? facets.join(',') : undefined,
        inheritance: (typeof inheritance !== 'undefined' && inheritance.length > 0) ? inheritance.join(',') : undefined,
        is_template: isTemplate,
        languages: (typeof languages !== 'undefined' && languages.length > 0) ? languages.join(',') : undefined,
        organization,
        owaspTop10: (typeof owaspTop10 !== 'undefined' && owaspTop10.length > 0) ? owaspTop10.join(',') : undefined,
        q,
        qprofile,
        repositories: (typeof repositories !== 'undefined' && repositories.length > 0) ? repositories.join(',') : undefined,
        rule_key: ruleKey,
        rule_keys: (typeof ruleKeys !== 'undefined' && ruleKeys.length > 0) ? ruleKeys.join(',') : undefined,
        s,
        sansTop25: (typeof sansTop25 !== 'undefined' && sansTop25.length > 0) ? sansTop25.join(',') : undefined,
        severities: (typeof severities !== 'undefined' && severities.length > 0) ? severities.join(',') : undefined,
        sonarsourceSecurity: (typeof sonarsourceSecurity !== 'undefined' && sonarsourceSecurity.length > 0) ? sonarsourceSecurity.join(',') : undefined,
        statuses: (typeof statuses !== 'undefined' && statuses.length > 0) ? statuses.join(',') : undefined,
        tags: (typeof tags !== 'undefined' && tags.length > 0) ? tags.join(',') : undefined,
        template_key: templateKey,
        types: (typeof types !== 'undefined' && types.length > 0) ? types.join(',') : undefined,
        asc,
        include_external: includeExternal,
        p,
        ps,
      },
    });
  }

  show(key: string, organization: string, actives = false) {
    return this.instance.get(`${this.path}/show`, {
      params: {
        key, organization, actives,
      },
    });
  }

  tags(organization: string, q?: string, ps = 10) {
    return this.instance.get(`${this.path}/tags`, {
      params: {
        organization, q, ps,
      },
    });
  }

  update(
    key: string,
    organization: string,
    markdownDescription?: string,
    markdownNote?: string,
    name?: string,
    params?: string,
    remediationFnBaseEffort?: string,
    remediationFnType?: RulesRemediationFnType,
    remediationFyGapMultiplier?: string,
    severity?: SonarIssuesSeverity,
    status?: SonarStatus,
    tags?: string[],
  ) {
    return this.instance.post(`${this.path}/update`, utils.objectToPostParam({
      key,
      organization,
      markdown_description: markdownDescription,
      markdown_note: markdownNote,
      name,
      params,
      remediation_fn_base_effort: remediationFnBaseEffort,
      remediation_fn_type: remediationFnType,
      remediation_fy_gap_multiplier: remediationFyGapMultiplier,
      severity,
      status,
      tags: (typeof tags !== 'undefined' && tags.length > 0) ? tags.join(',') : undefined,
    }));
  }
}
