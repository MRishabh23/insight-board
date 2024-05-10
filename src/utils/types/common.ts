// ************* param types start ****************

export type ParamType = {
    mode: string;
    env: string;
    dash: string;
  };
  
  // ************* param types end ****************
  
  // ************* auth types start ****************
  
  export type SignInType = {
    role: string;
    username: string;
    password: string;
  };
  
  export type SubmitType = {
    username: string;
    password: string;
  };
  
  export type AuthType = {
    title: string;
    switchTitle?: string;
    switchRoute?: string;
    postRoute: string;
    pushRoute: string;
  };
  
  // ************* auth types end ****************
  
  // ************* dashboard types start ****************
  
  // status related types
  
  export type StatusType = {
    carrier: string;
    status: string;
  };
  
  // summary related types
  
  export type SummaryType = {
    key: React.Key;
    jtCarrierCode: string;
    total_shipments: number;
    jtCrawledTotal: number;
    successCount: number;
    failCount: number;
    getTotalDiffFound: number;
    getTotalNODiffFound: number;
    getSentToFK: number;
    getNotSentToFK: number;
    getReferenceNotFound: number;
    getReferenceNotFoundPercentage: number;
    skipped404: number;
    successRatio: number;
    failureRatio: number;
    diffRatio: number;
    start_time: string;
    end_time: string;
    durationToLaunch: number;
    schedulerId: number;
    timeDiffMinutes: number;
    timeDiffInFk: string;
    lastRunStartAt: string;
    delayTime: number;
    lastRunStartTime: string;
    threadPoolSize: number;
    deliverCount: number;
    closeCount: number;
    queueType: string;
    hitRateCount: number;
    hitRatePer: number;
    toFKFailedScraping: number;
    toFKFailedValidation: number;
    toFKFailedNotSent: number;
    toFKFailedMapping: number;
    crawlFrequency: string;
    referenceNotFound: number;
    refPercentage: number;
    diffRateCountWithInCron: number;
    diffRateCountAboveCron: number;
    diffHitRateCountWithInCron: number;
    diffHitRateCountAboveCron: number;
    AvgAge: number;
  };
  
  export type SummaryFormType = {
    carriers: string[];
    queue: string;
    range: {
      from: Date;
      to: Date;
    };
  };
  
  // history related types
  
  export type HistoryType = {
    k: string;
    v: InnerValue;
  };
  
  type InnerValue = {
    error: string;
    errorMsg: string;
    failures: string;
    errorCode: string;
    apiHitCount: string;
    crawl_status: string;
    insertion_time: string;
    jtLatencyInMinutes: string;
    ageDifferenceInDays: string;
    crawledJsonResourceId: string;
    fkMappedJsonResourceId: string;
    latestFKMappedJsonResourceId: string;
  };
  
  export type HistoryFormType = {
    subId: string;
    historyType: string;
    range: {
      from: Date;
      to: Date;
    };
  };
  
  // ************* dashboard types end ****************
  