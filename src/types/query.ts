export type FieldType = "Status" | "Priority" | "Assigned To" | "Category";

export type Operator =
  | "equals"
  | "not equals"
  | "contains"
  | "does not contain";

export interface Condition {
  id: string;
  field: FieldType;
  operator: Operator;
  value: string;
}

export interface QueryGroup {
  id: string;
  logic: "AND" | "OR";
  conditions: Condition[];
  groups: QueryGroup[];
}

export interface Query {
  logic: "AND" | "OR";
  conditions: Condition[];
  groups: QueryGroup[];
}

export interface CleanCondition {
  field: FieldType;
  operator: Operator;
  value: string;
}

export interface CleanQueryGroup {
  logic: "AND" | "OR";
  conditions: CleanCondition[];
  groups: CleanQueryGroup[];
}

export interface CleanQuery {
  logic: "AND" | "OR";
  conditions: CleanCondition[];
  groups: CleanQueryGroup[];
}
