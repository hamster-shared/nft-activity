export enum activityStatus {
  // 0 活动不存在
  // 1 没有开始
  // 2 活动中
  // 3 活动结束
  'Not exist' = 0,
  'Coming soon' = 1,
  'Start Now' = 2,
  'The event has ended' = 3,
}

export enum paramsEnum {
  'name' = '1-64 Characters',
  'amount' = '0-99.999.999,999,999,999',
  'symbol' = '1-16 Characters',
  'uri' = 'uri',
}