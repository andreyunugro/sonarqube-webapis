import { AxiosInstance } from 'axios';
import {
  SonarInheritance, SonarIssuesSeverity, SonarOWASPTop10, SonarType,
  SonarSANSTop25, SonarSortField, SonarSourceSecurity, SonarStatus,
  SonarLanguage,
  SonarSelected,
} from '../enums';
import { RulesTypes } from './rules';
import utils from '../utils';

export enum QualityProfilesExporterKey {
  sonarLintVSVBNet = 'sonarlint-vs-vbnet',
  sonarLintVSCS = 'sonarlint-vs-cs',
  roslynVBNet = 'roslyn-vbnet',
  roslynCS = 'roslyn-cs',
}

export default class QualityProfiles {
  instance: AxiosInstance;

  readonly path = 'qualityprofiles';

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  activateRule(
    key: string,
    rule: string,
    params?: string,
    reset?: boolean,
    severity?: SonarIssuesSeverity,
  ) {
    return this.instance.post(`${this.path}/activate_rule`, utils.objectToPostParam({
      key, rule, params, reset, severity,
    }));
  }

  activateRules(
    targetKey: string,
    activation?: boolean,
    activeSeverities?: SonarIssuesSeverity[],
    availableSince?: string,
    cwe?: string[],
    inheritance?: SonarInheritance[],
    isTemplate?: boolean,
    languages?: string[],
    organization?: string,
    owaspTop10?: SonarOWASPTop10[],
    q?: string,
    qprofile?: string,
    repositories?: string[],
    ruleKey?: string,
    s?: SonarSortField,
    sansTop25?: SonarSANSTop25[],
    severities?: SonarIssuesSeverity[],
    sonarsourceSecurity?: SonarSourceSecurity[],
    statuses?: SonarStatus[],
    tags?: string[],
    targetSeverity?: SonarIssuesSeverity,
    templateKey?: string,
    types?: SonarType[] | RulesTypes[],
    asc = true,
  ) {
    return this.instance.post(`${this.path}/activate_rules`, utils.objectToPostParam({
      targetKey,
      activation,
      active_severities: (typeof activeSeverities !== 'undefined' && activeSeverities.length > 0) ? activeSeverities.join(',') : undefined,
      available_since: availableSince,
      cwe: (typeof cwe !== 'undefined' && cwe.length > 0) ? cwe.join(',') : undefined,
      inheritance: (typeof inheritance !== 'undefined' && inheritance.length > 0) ? inheritance.join(',') : undefined,
      is_template: isTemplate,
      languages: (typeof languages !== 'undefined' && languages.length > 0) ? languages.join(',') : undefined,
      organization,
      owaspTop10: (typeof owaspTop10 !== 'undefined' && owaspTop10.length > 0) ? owaspTop10.join(',') : undefined,
      q,
      qprofile,
      repositories: (typeof repositories !== 'undefined' && repositories.length > 0) ? repositories.join(',') : undefined,
      rule_key: ruleKey,
      s,
      sansTop25: (typeof sansTop25 !== 'undefined' && sansTop25.length > 0) ? sansTop25.join(',') : undefined,
      severities: (typeof severities !== 'undefined' && severities.length > 0) ? severities.join(',') : undefined,
      sonarsourceSecurity: (typeof sonarsourceSecurity !== 'undefined' && sonarsourceSecurity.length > 0) ? sonarsourceSecurity.join(',') : undefined,
      statuses: (typeof statuses !== 'undefined' && statuses.length > 0) ? statuses.join(',') : undefined,
      tags: (typeof tags !== 'undefined' && tags.length > 0) ? tags.join(',') : undefined,
      targetSeverity,
      template_key: templateKey,
      types: (typeof types !== 'undefined' && types.length > 0) ? types.join(',') : undefined,
      asc,
    }));
  }

  addProject(
    language?: SonarLanguage,
    organization?: string,
    project?: string,
    qualityProfile?: string,
  ) {
    return this.instance.post(`${this.path}/add_project`, utils.objectToPostParam({
      language, organization, project, qualityProfile,
    }));
  }

  backup(language?: SonarLanguage, organization?: string, qualityProfile?: string) {
    return this.instance.get(`${this.path}/backup`, { params: { language, organization, qualityProfile } });
  }

  changeParent(
    language?: SonarLanguage,
    organization?: string,
    parentQualityProfile?: string,
    qualityProfile?: string,
  ) {
    return this.instance.post(`${this.path}/change_parent`, utils.objectToPostParam({
      language, organization, parentQualityProfile, qualityProfile,
    }));
  }

  changelog(
    language?: SonarLanguage,
    organization?: string,
    qualityProfile?: string,
    since?: string,
    to?: string,
    p = 1,
    ps = 50,
  ) {
    return this.instance.get(`${this.path}/changelog`, {
      params: {
        language, organization, qualityProfile, since, to, p, ps,
      },
    });
  }

  copy(fromKey: string, toName: string) {
    return this.instance.post(`${this.path}/copy`, utils.objectToPostParam({ fromKey, toName }));
  }

  create(language: SonarLanguage, name: string, organization: string) {
    return this.instance.post(`${this.path}/create`, utils.objectToPostParam({
      language, name, organization,
    }));
  }

  deactivateRule(key: string, rule: string) {
    return this.instance.post(`${this.path}/deactivate_rule`, utils.objectToPostParam({ key, rule }));
  }

  deactivateRules(
    targetKey: string,
    activation?: boolean,
    activeSeverities?: SonarIssuesSeverity[],
    availableSince?: string,
    cwe?: string[],
    inheritance?: SonarInheritance[],
    isTemplate?: boolean,
    languages?: string[],
    organization?: string,
    owaspTop10?: SonarOWASPTop10[],
    q?: string,
    qprofile?: string,
    repositories?: string[],
    ruleKey?: string,
    s?: SonarSortField,
    sansTop25?: SonarSANSTop25[],
    severities?: SonarIssuesSeverity[],
    sonarsourceSecurity?: SonarSourceSecurity[],
    statuses?: SonarStatus[],
    tags?: string[],
    templateKey?: string,
    types?: SonarType[] | RulesTypes[],
    asc = true,
  ) {
    return this.instance.post(`${this.path}/deactivate_rules`, utils.objectToPostParam({
      targetKey,
      activation,
      active_severities: (typeof activeSeverities !== 'undefined' && activeSeverities.length > 0) ? activeSeverities.join(',') : undefined,
      available_since: availableSince,
      cwe: (typeof cwe !== 'undefined' && cwe.length > 0) ? cwe.join(',') : undefined,
      inheritance: (typeof inheritance !== 'undefined' && inheritance.length > 0) ? inheritance.join(',') : undefined,
      is_template: isTemplate,
      languages: (typeof languages !== 'undefined' && languages.length > 0) ? languages.join(',') : undefined,
      organization,
      owaspTop10: (typeof owaspTop10 !== 'undefined' && owaspTop10.length > 0) ? owaspTop10.join(',') : undefined,
      q,
      qprofile,
      repositories: (typeof repositories !== 'undefined' && repositories.length > 0) ? repositories.join(',') : undefined,
      rule_key: ruleKey,
      s,
      sansTop25: (typeof sansTop25 !== 'undefined' && sansTop25.length > 0) ? sansTop25.join(',') : undefined,
      severities: (typeof severities !== 'undefined' && severities.length > 0) ? severities.join(',') : undefined,
      sonarsourceSecurity: (typeof sonarsourceSecurity !== 'undefined' && sonarsourceSecurity.length > 0) ? sonarsourceSecurity.join(',') : undefined,
      statuses: (typeof statuses !== 'undefined' && statuses.length > 0) ? statuses.join(',') : undefined,
      tags: (typeof tags !== 'undefined' && tags.length > 0) ? tags.join(',') : undefined,
      template_key: templateKey,
      types: (typeof types !== 'undefined' && types.length > 0) ? types.join(',') : undefined,
      asc,
    }));
  }

  delete(
    language?: SonarLanguage,
    organization?: string,
    qualityProfile?: string,
  ) {
    return this.instance.post(`${this.path}/delete`, utils.objectToPostParam({
      language, organization, qualityProfile,
    }));
  }

  export(
    organization: string,
    exporterKey?: QualityProfilesExporterKey,
    language?: SonarLanguage,
    qualityProfile?: string,
  ) {
    return this.instance.get(`${this.path}/export`, {
      params: {
        organization, exporterKey, language, qualityProfile,
      },
    });
  }

  exporters() {
    return this.instance.get(`${this.path}/exporters`);
  }

  importers() {
    return this.instance.get(`${this.path}/importers`);
  }

  inheritance(
    language?: SonarLanguage,
    organization?: string,
    qualityProfile?: string,
  ) {
    return this.instance.get(`${this.path}/inheritance`, {
      params: {
        language, organization, qualityProfile,
      },
    });
  }

  projects(
    key: string,
    q?: string,
    p = 1,
    ps = 100,
    selected: SonarSelected = SonarSelected.selected,
  ) {
    return this.instance.get(`${this.path}/projects`, {
      params: {
        key, q, p, ps, selected,
      },
    });
  }

  removeProject(
    language?: SonarLanguage,
    organization?: string,
    project?: string,
    qualityProfile?: string,
  ) {
    return this.instance.post(`${this.path}/remove_project`, utils.objectToPostParam({
      language, organization, project, qualityProfile,
    }));
  }

  rename(key: string, name: string) {
    return this.instance.post(`${this.path}/rename`, utils.objectToPostParam({ key, name }));
  }

  restore(backup: string, organization: string) {
    return this.instance.post(`${this.path}/restore`, utils.objectToPostParam({ backup, organization }));
  }

  search(
    organization: string,
    language?: SonarLanguage,
    project?: string,
    qualityProfile?: string,
    defaults = false,
  ) {
    return this.instance.get(`${this.path}/search`, {
      params: {
        organization, language, project, qualityProfile, defaults,
      },
    });
  }

  setDefault(
    language?: SonarLanguage,
    organization?: string,
    qualityProfile?: string,
  ) {
    return this.instance.post(`${this.path}/set_default`, utils.objectToPostParam({
      language, organization, qualityProfile,
    }));
  }
}
