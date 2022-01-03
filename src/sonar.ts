import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as Resources from './resources/index';

export * as Resources from './resources/index';

export interface SonarConfig extends AxiosRequestConfig {
  auth: {
    username: string,
    password: string,
  },
  baseURL: string,
}

export default class Sonar {
  instance: AxiosInstance;

  authentication: Resources.Authentication;

  ce: Resources.CE;

  components: Resources.Components;

  duplications: Resources.Duplications;

  favorites: Resources.Favorites;

  issues: Resources.Issues;

  languages: Resources.Languages;

  measures: Resources.Measures;

  metrics: Resources.Metrics;

  notifications: Resources.Notifications;

  permissions: Resources.Permissions;

  projectAnalyses: Resources.ProjectAnalyses;

  projectBadges: Resources.ProjectBadges;

  projectBranches: Resources.ProjectBranches;

  projectLinks: Resources.ProjectLinks;

  projectPullRequests: Resources.ProjectPullRequests;

  projectTags: Resources.ProjectTags;

  projects: Resources.Projects;

  qualityGates: Resources.QualityGates;

  qualityProfiles: Resources.QualityProfiles;

  rules: Resources.Rules;

  settings: Resources.Settings;

  sources: Resources.Sources;

  userGroups: Resources.UserGroups;

  userTokens: Resources.UserTokens;

  users: Resources.Users;

  webhooks: Resources.Webhooks;

  webServices: Resources.WebServices;

  constructor(config: SonarConfig) {
    this.instance = axios.create(config);
    this.authentication = new Resources.Authentication(this.instance);
    this.ce = new Resources.CE(this.instance);
    this.components = new Resources.Components(this.instance);
    this.duplications = new Resources.Duplications(this.instance);
    this.favorites = new Resources.Favorites(this.instance);
    this.issues = new Resources.Issues(this.instance);
    this.languages = new Resources.Languages(this.instance);
    this.measures = new Resources.Measures(this.instance);
    this.metrics = new Resources.Metrics(this.instance);
    this.notifications = new Resources.Notifications(this.instance);
    this.permissions = new Resources.Permissions(this.instance);
    this.projectAnalyses = new Resources.ProjectAnalyses(this.instance);
    this.projectBadges = new Resources.ProjectBadges(this.instance);
    this.projectBranches = new Resources.ProjectBranches(this.instance);
    this.projectLinks = new Resources.ProjectLinks(this.instance);
    this.projectPullRequests = new Resources.ProjectPullRequests(this.instance);
    this.projectTags = new Resources.ProjectTags(this.instance);
    this.projects = new Resources.Projects(this.instance);
    this.qualityGates = new Resources.QualityGates(this.instance);
    this.qualityProfiles = new Resources.QualityProfiles(this.instance);
    this.rules = new Resources.Rules(this.instance);
    this.settings = new Resources.Settings(this.instance);
    this.sources = new Resources.Sources(this.instance);
    this.userGroups = new Resources.UserGroups(this.instance);
    this.userTokens = new Resources.UserTokens(this.instance);
    this.users = new Resources.Users(this.instance);
    this.webhooks = new Resources.Webhooks(this.instance);
    this.webServices = new Resources.WebServices(this.instance);
  }
}
