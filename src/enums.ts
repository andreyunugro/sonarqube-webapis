export enum SonarSortFields {
  metric = 'metric',
  metricPeriod = 'metricPeriod',
  name = 'name',
  path = 'path',
  qualifier = 'qualifier',
}

export enum SonarSearchStrategy {
  all = 'all',
  children = 'children',
  leaves = 'leaves',
}

export enum SonarComponentsQualifiers {
  BRC = 'BRC',
  DIR = 'DIR',
  FIL = 'FIL',
  TRK = 'TRK',
  UTS = 'UTS',
}

export enum SonarIssuesSeverity {
  info = 'INFO',
  minor = 'MINOR',
  major = 'MAJOR',
  critical = 'CRITICAL',
  blocker = 'BLOCKER',
}

export enum SonarOWASPTop10 {
  a1 = 'a1',
  a2 = 'a2',
  a3 = 'a3',
  a4 = 'a4',
  a5 = 'a5',
  a6 = 'a6',
  a7 = 'a7',
  a8 = 'a8',
  a9 = 'a9',
  a10 = 'a10',
}

export enum SonarSourceSecurity {
  sqlInjection = 'sql-injection',
  commandInjection = 'command-injection',
  pathTraversalInjection = 'path-traversal-injection',
  ldapInjection = 'ldap-injection',
  xpathInjection = 'xpath-injection',
  rce = 'rce',
  dos = 'dos',
  ssrf = 'ssrf',
  csrf = 'csrf',
  xss = 'xss',
  logInjection = 'log-injection',
  httpResponseSplitting = 'http-response-splitting',
  openRedirect = 'open-redirect',
  xxe = 'xxe',
  objectInjection = 'object-injection',
  weakCryptography = 'weak-cryptography',
  auth = 'auth',
  insecureConf = 'insecure-conf',
  encryptData = 'encrypt-data',
  traceability = 'traceability',
  fileManipulation = 'file-manipulation',
  others = 'others',
}

export enum SonarType {
  codeSmell = 'CODE_SMELL',
  bug = 'BUG',
  vulnerability = 'VULNERABILITY',
}

export enum SonarSANSTop25 {
  insecureInteraction = 'insecure-interaction',
  riskyResource = 'risky-resource',
  porousDefenses = 'porous-defenses',
}

export enum SonarFacets {
  languages = 'languages',
  tags = 'tags',
  severities = 'severities',
  statuses = 'statuses',
  types = 'types',
  cwe = 'cwe',
  owaspTop10 = 'owaspTop10',
  sansTop25 = 'sansTop25',
  sonarsourceSecurity = 'sonarsourceSecurity',
}

export enum SonarInheritance {
  none = 'NONE',
  inherited = 'INHERITED',
  overrides = 'OVERRIDES',
}

export enum SonarSortField {
  name = 'name',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
  key = 'key',
}

export enum SonarStatus {
  beta = 'BETA',
  deprecated = 'DEPRECATED',
  ready = 'READY',
  removed = 'REMOVED',
}

export enum SonarLanguage {
  css = 'css',
  scala = 'scala',
  jsp = 'jsp',
  py = 'py',
  js = 'js',
  plsql = 'plsql',
  apex = 'apex',
  java = 'java',
  web = 'web',
  flex = 'flex',
  xml = 'xml',
  json = 'json',
  vbnet = 'vbnet',
  cloudformation = 'cloudformation',
  swift = 'swift',
  yaml = 'yaml',
  cpp = 'cpp',
  c = 'c',
  kotlin = 'kotlin',
  go = 'go',
  tsql = 'tsql',
  ruby = 'ruby',
  cs = 'cs',
  cobol = 'cobol',
  php = 'php',
  terraform = 'terraform',
  abap = 'abap',
  objc = 'objc',
  ts = 'ts',
}

export enum SonarSelected {
  all = 'all',
  deselected = 'deselected',
  selected = 'selected',
}

// https://docs.sonarqube.org/latest/user-guide/metric-definitions/
export enum SonarMetricKey {
  // Complexity.
  complexity = 'complexity',
  cognitiveComplexity = 'cognitive_complexity',
  // Duplications.
  duplicatedBlocks = 'duplicated_blocks',
  duplicatedFiles = 'duplicated_files',
  duplicatedLines = 'duplicated_lines',
  duplicatedLinesDensity = 'duplicated_lines_density',
  // Issues.
  newViolations = 'new_violations',
  newXXXViolations = 'new_xxx_violations',
  violations = 'violations',
  xxxViolations = 'xxx_violations',
  falsePositiveIssues = 'false_positive_issues',
  openIssues = 'open_issues',
  confirmedIssues = 'confirmed_issues',
  reopenedIssues = 'reopened_issues',
  // Maintainability.
  codeSmells = 'code_smells',
  newCodeSmells = 'new_code_smells',
  sqaleRating = 'sqale_rating',
  sqaleIndex = 'sqale_index',
  newTechnicalDebt = 'new_technical_debt',
  sqaleDebtRatio = 'sqale_debt_ratio',
  newSqaleDebtRatio = 'new_sqale_debt_ratio',
  // Quality Gates.
  alertStatus = 'alert_status',
  qualityGateDetails = 'quality_gate_details',
  // Reliability.
  bugs = 'bugs',
  newBugs = 'new_bugs',
  reliabilityRating = 'reliability_rating',
  reliabilityRemediationEffort = 'reliability_remediation_effort',
  newReliabilityRemediationEffort = 'new_reliability_remediation_effort',
  // Security.
  vulnerabilities = 'vulnerabilities',
  newVulnerabilities = 'new_vulnerabilities',
  securityRating = 'security_rating',
  securityRemediationEffort = 'security_remediation_effort',
  newSecurityRemediationEffort = 'new_security_remediation_effort',
  securityHotspots = 'security_hotspots',
  newSecurityHotspots = 'new_security_hotspots',
  securityReviewRating = 'security_review_rating',
  newSecurityReviewRating = 'new_security_review_rating',
  securityHotspotsReviewed = 'security_hotspots_reviewed',
  // Size.
  classes = 'classes',
  commentLines = 'comment_lines',
  commentLinesDensity = 'comment_lines_density',
  directories = 'directories',
  files = 'files',
  lines = 'lines',
  ncloc = 'ncloc',
  nclocLanguageDistribution = 'ncloc_language_distribution',
  functions = 'functions',
  projects = 'projects',
  statements = 'statements',
  // Tests.
  branchCoverage = 'branch_coverage',
  newBranchCoverage = 'new_branch_coverage',
  branchCoverageHitsData = 'branch_coverage_hits_data',
  conditionsByLine = 'conditions_by_line',
  coveredConditionsByLine = 'covered_conditions_by_line',
  coverage = 'coverage',
  newCoverage = 'new_coverage',
  lineCoverage = 'line_coverage',
  newLineCoverage = 'new_line_coverage',
  coverageLineHitsData = 'coverage_line_hits_data',
  linesToCover = 'lines_to_cover',
  newLinesToCover = 'new_lines_to_cover',
  skippedTests = 'skipped_tests',
  uncoveredConditions = 'uncovered_conditions',
  newUncoveredConditions = 'new_uncovered_conditions',
  uncoveredLines = 'uncovered_lines',
  newUncoveredLines = 'new_uncovered_lines',
  tests = 'tests',
  testExecutionTime = 'test_execution_time',
  testErrors = 'test_errors',
  testFailures = 'test_failures',
  testSuccessDensity = 'test_success_density',
}
