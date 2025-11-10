import type { FieldType } from "@/types/query";

export const FIELD_OPTIONS: FieldType[] = [
  "Status",
  "Priority",
  "Assigned To",
  "Category",
];

export const OPERATOR_OPTIONS = [
  "equals",
  "not equals",
  "contains",
  "does not contain",
] as const;

export const FIELD_VALUES: Record<FieldType, string[]> = {
  Status: ["Open", "In Progress", "Closed"],
  Priority: ["Low", "Medium", "High"],
  "Assigned To": ["User A", "User B", "User C"],
  Category: ["Bug", "Feature", "Task"],
};
