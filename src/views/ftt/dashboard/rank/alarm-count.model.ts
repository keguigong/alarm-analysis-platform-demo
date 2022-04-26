export default class AlarmCountModel {
  public alarmTypeId!: number
  public alarmDescription!: string
  public alarmRaiseCount!: number
  public alarmDiagnosis!: AlarmDiagnosisItem[]
}

class AlarmDiagnosisItem {
  public diagnosisId!: number
  public diagnosisDescription!: string
  public diagnosisCount!: number
}
