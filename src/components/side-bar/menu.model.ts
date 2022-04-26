export default class MenuModel {
  public id!: number
  public name!: string
  public icon?: string
  public path!: string
  public identifier!: string
  public parentId!: number
  public priority!: number
  public treeLevel!: number
  public status!: number
  public comment!: string
  public children?: MenuModel[]
}
