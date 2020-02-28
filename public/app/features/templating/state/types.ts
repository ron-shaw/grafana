import { VariableModel, VariableType } from '../variable';
import { DataSourceSelectItem } from '@grafana/data';
import { TemplatingState } from './reducers';

export const emptyUuid = '00000000-0000-0000-0000-000000000000';

export interface VariableEditorState {
  name: string;
  type: VariableType;
  errors: Record<string, string>;
  isValid: boolean;
  dataSources: DataSourceSelectItem[]; // TODO: This isn't needed for custom move it?
}

export interface OnPropChangeArguments<Model extends VariableModel = VariableModel> {
  propName: keyof Model;
  propValue: any;
  updateOptions?: boolean;
}

export interface VariableEditorOnPropChange<Model extends VariableModel = VariableModel> {
  onPropChange: (args: OnPropChangeArguments<Model>) => void;
}

export interface VariableEditorProps<
  Model extends VariableModel = VariableModel,
  EditorState extends VariableEditorState = VariableEditorState
> extends VariableEditorOnPropChange<Model> {
  variable: Model;
  editor: EditorState;
  dataSources: DataSourceSelectItem[];
}

export interface VariablePickerProps<Model extends VariableModel = VariableModel, PickerState extends {} = {}> {
  variable: Model;
  picker: PickerState;
}

export const initialVariableEditorState: VariableEditorState = {
  name: '',
  type: 'query', // TODO: can we set this somewhere else?
  errors: {},
  isValid: true,
  dataSources: [], // TODO: should we move this to QueryVariabelState or maybe a DatasourceVariableState?
};

export interface VariableState<
  PickerState extends {} = {},
  EditorState extends VariableEditorState = VariableEditorState,
  ModelState extends VariableModel = VariableModel
> {
  picker: PickerState;
  editor: EditorState;
  variable: ModelState;
}

export const getInstanceState = <State extends VariableState = VariableState>(state: TemplatingState, uuid: string) => {
  return state.variables[uuid] as State;
};
