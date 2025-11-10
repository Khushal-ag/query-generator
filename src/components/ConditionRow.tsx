import { X } from "lucide-react";

import type { Condition, FieldType, Operator } from "@/types/query";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FIELD_OPTIONS, FIELD_VALUES, OPERATOR_OPTIONS } from "@/config/fields";

interface ConditionRowProps {
  condition: Condition;
  onUpdate: (condition: Condition) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export default function ConditionRow({
  condition,
  onUpdate,
  onRemove,
  canRemove,
}: ConditionRowProps) {
  const handleFieldChange = (field: FieldType) => {
    const values = FIELD_VALUES[field];
    onUpdate({
      ...condition,
      field,
      value: values[0] || "",
    });
  };

  const handleOperatorChange = (operator: Operator) => {
    onUpdate({
      ...condition,
      operator,
    });
  };

  const handleValueChange = (value: string) => {
    onUpdate({
      ...condition,
      value,
    });
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm sm:flex-row sm:items-end">
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label
            htmlFor={`field-${condition.id}`}
            className="text-xs text-muted-foreground"
          >
            Field
          </Label>
          <Select value={condition.field} onValueChange={handleFieldChange}>
            <SelectTrigger
              id={`field-${condition.id}`}
              className="w-full sm:w-[160px]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FIELD_OPTIONS.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <Label
            htmlFor={`operator-${condition.id}`}
            className="text-xs text-muted-foreground"
          >
            Operator
          </Label>
          <Select
            value={condition.operator}
            onValueChange={handleOperatorChange}
          >
            <SelectTrigger
              id={`operator-${condition.id}`}
              className="w-full sm:w-[170px]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OPERATOR_OPTIONS.map((op) => (
                <SelectItem key={op} value={op}>
                  {op}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2">
          <Label
            htmlFor={`value-${condition.id}`}
            className="text-xs text-muted-foreground"
          >
            Value
          </Label>
          <Select value={condition.value} onValueChange={handleValueChange}>
            <SelectTrigger id={`value-${condition.id}`} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FIELD_VALUES[condition.field].map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {canRemove && (
        <Button
          onClick={onRemove}
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 self-end sm:self-auto"
          aria-label="Remove condition"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
