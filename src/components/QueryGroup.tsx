import { useState } from "react";

import { Plus, Trash2 } from "lucide-react";

import type { Condition, QueryGroup as QueryGroupType } from "@/types/query";

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
import { generateId } from "@/utils/id";

import ConditionRow from "./ConditionRow";

interface QueryGroupProps {
  group: QueryGroupType;
  onUpdate: (group: QueryGroupType) => void;
  onRemove?: () => void;
  canRemove: boolean;
  level?: number;
}

export default function QueryGroupComponent({
  group,
  onUpdate,
  onRemove,
  canRemove,
  level = 0,
}: QueryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogicChange = (logic: "AND" | "OR") => {
    onUpdate({
      ...group,
      logic,
    });
  };

  const handleAddCondition = () => {
    const newCondition: Condition = {
      id: generateId(),
      field: FIELD_OPTIONS[0],
      operator: OPERATOR_OPTIONS[0],
      value: FIELD_VALUES[FIELD_OPTIONS[0]][0],
    };
    onUpdate({
      ...group,
      conditions: [...group.conditions, newCondition],
    });
  };

  const handleAddGroup = () => {
    const newGroup: QueryGroupType = {
      id: generateId(),
      logic: "AND",
      conditions: [],
      groups: [],
    };
    onUpdate({
      ...group,
      groups: [...group.groups, newGroup],
    });
  };

  const handleUpdateCondition = (updatedCondition: Condition) => {
    onUpdate({
      ...group,
      conditions: group.conditions.map((c) =>
        c.id === updatedCondition.id ? updatedCondition : c,
      ),
    });
  };

  const handleRemoveCondition = (conditionId: string) => {
    onUpdate({
      ...group,
      conditions: group.conditions.filter((c) => c.id !== conditionId),
    });
  };

  const handleUpdateGroup = (updatedGroup: QueryGroupType) => {
    onUpdate({
      ...group,
      groups: group.groups.map((g) =>
        g.id === updatedGroup.id ? updatedGroup : g,
      ),
    });
  };

  const handleRemoveGroup = (groupId: string) => {
    onUpdate({
      ...group,
      groups: group.groups.filter((g) => g.id !== groupId),
    });
  };

  return (
    <div
      className="rounded-lg border bg-muted/30 p-4 shadow-sm"
      style={{
        marginLeft: level > 0 ? `${Math.min(level * 16, 48)}px` : "0",
      }}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0"
            aria-label={isExpanded ? "Collapse group" : "Expand group"}
          >
            {isExpanded ? "−" : "+"}
          </Button>

          <div className="space-y-2">
            <Label
              htmlFor={`group-logic-${group.id}`}
              className="text-xs text-muted-foreground"
            >
              Logic
            </Label>
            <Select
              value={group.logic}
              onValueChange={(value) =>
                handleLogicChange(value as "AND" | "OR")
              }
            >
              <SelectTrigger
                id={`group-logic-${group.id}`}
                className="h-9 w-[100px]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND</SelectItem>
                <SelectItem value="OR">OR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {canRemove && onRemove && (
          <Button
            onClick={onRemove}
            variant="ghost"
            size="icon"
            className="h-9 w-9 self-end sm:ml-auto sm:self-auto"
            aria-label="Remove group"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {group.conditions.map((condition) => (
            <ConditionRow
              key={condition.id}
              condition={condition}
              onUpdate={handleUpdateCondition}
              onRemove={() => handleRemoveCondition(condition.id)}
              canRemove={group.conditions.length > 1}
            />
          ))}

          {group.groups.map((subGroup) => (
            <QueryGroupComponent
              key={subGroup.id}
              group={subGroup}
              onUpdate={handleUpdateGroup}
              onRemove={() => handleRemoveGroup(subGroup.id)}
              canRemove
              level={level + 1}
            />
          ))}

          <div className="flex flex-col gap-2 border-t pt-3 sm:flex-row">
            <Button
              onClick={handleAddCondition}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
            <Button
              onClick={handleAddGroup}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Group
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
