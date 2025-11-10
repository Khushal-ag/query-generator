import { useState } from "react";

import { Play, Plus } from "lucide-react";

import type {
  CleanQuery,
  CleanQueryGroup,
  Condition,
  Query,
  QueryGroup,
} from "@/types/query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import QueryGroupComponent from "./QueryGroup";
import QueryOutput from "./QueryOutput";

export default function QueryBuilder() {
  const [query, setQuery] = useState<Query>({
    logic: "AND",
    conditions: [
      {
        id: generateId(),
        field: FIELD_OPTIONS[0],
        operator: OPERATOR_OPTIONS[0],
        value: FIELD_VALUES[FIELD_OPTIONS[0]][0],
      },
    ],
    groups: [],
  });

  const [output, setOutput] = useState<CleanQuery | null>(null);

  const handleAddCondition = () => {
    const newCondition: Condition = {
      id: generateId(),
      field: FIELD_OPTIONS[0],
      operator: OPERATOR_OPTIONS[0],
      value: FIELD_VALUES[FIELD_OPTIONS[0]][0],
    };
    setQuery({
      ...query,
      conditions: [...query.conditions, newCondition],
    });
  };

  const handleAddGroup = () => {
    const newGroup: QueryGroup = {
      id: generateId(),
      logic: "AND",
      conditions: [],
      groups: [],
    };
    setQuery({
      ...query,
      groups: [...query.groups, newGroup],
    });
  };

  const handleUpdateCondition = (updatedCondition: Condition) => {
    setQuery({
      ...query,
      conditions: query.conditions.map((c) =>
        c.id === updatedCondition.id ? updatedCondition : c,
      ),
    });
  };

  const handleRemoveCondition = (conditionId: string) => {
    const newConditions = query.conditions.filter((c) => c.id !== conditionId);
    if (newConditions.length === 0 && query.groups.length === 0) {
      setQuery({
        ...query,
        conditions: [
          {
            id: generateId(),
            field: FIELD_OPTIONS[0],
            operator: OPERATOR_OPTIONS[0],
            value: FIELD_VALUES[FIELD_OPTIONS[0]][0],
          },
        ],
      });
    } else {
      setQuery({
        ...query,
        conditions: newConditions,
      });
    }
  };

  const handleUpdateGroup = (updatedGroup: QueryGroup) => {
    setQuery({
      ...query,
      groups: query.groups.map((g) =>
        g.id === updatedGroup.id ? updatedGroup : g,
      ),
    });
  };

  const handleRemoveGroup = (groupId: string) => {
    setQuery({
      ...query,
      groups: query.groups.filter((g) => g.id !== groupId),
    });
  };

  const handleLogicChange = (logic: "AND" | "OR") => {
    setQuery({
      ...query,
      logic,
    });
  };

  const handleSubmit = () => {
    const cleanGroup = (group: QueryGroup): CleanQueryGroup => {
      return {
        logic: group.logic,
        conditions: group.conditions.map(({ id, ...rest }) => rest),
        groups: group.groups.map(cleanGroup),
      };
    };

    const cleaned: CleanQuery = {
      logic: query.logic,
      conditions: query.conditions.map(({ id, ...rest }) => rest),
      groups: query.groups.map(cleanGroup),
    };

    setOutput(cleaned);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="mb-1.5 text-2xl font-semibold sm:text-3xl">
          Query Builder
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Build queries with conditions and groups using AND/OR logic
        </p>
      </div>

      <Card className="mb-6 shadow-md">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-lg">Query Conditions</CardTitle>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <Label
                htmlFor="root-logic"
                className="text-xs text-muted-foreground"
              >
                Root Logic
              </Label>
              <Select
                value={query.logic}
                onValueChange={(value) =>
                  handleLogicChange(value as "AND" | "OR")
                }
              >
                <SelectTrigger id="root-logic" className="w-full sm:w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {query.conditions.map((condition) => (
            <ConditionRow
              key={condition.id}
              condition={condition}
              onUpdate={handleUpdateCondition}
              onRemove={() => handleRemoveCondition(condition.id)}
              canRemove={query.conditions.length > 1 || query.groups.length > 0}
            />
          ))}

          {query.groups.map((group) => (
            <QueryGroupComponent
              key={group.id}
              group={group}
              onUpdate={handleUpdateGroup}
              onRemove={() => handleRemoveGroup(group.id)}
              canRemove
            />
          ))}

          <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row">
            <Button
              onClick={handleAddCondition}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
            <Button
              onClick={handleAddGroup}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Group
            </Button>
          </div>

          <Button onClick={handleSubmit} className="mt-2 w-full" size="lg">
            <Play className="mr-2 h-4 w-4" />
            Generate Query
          </Button>
        </CardContent>
      </Card>

      {output && <QueryOutput query={output} />}
    </div>
  );
}
