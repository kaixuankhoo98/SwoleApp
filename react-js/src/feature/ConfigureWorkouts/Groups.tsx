import { FC } from "react";
import { Box } from "@mui/material";
import { Accordion } from "../../shared/components/Accordion";
import { GroupRow } from "./GroupRow";
import { AddGroupButton } from "./AddGroupButton";
import { Loading } from "../../shared/components/Loading";
import { UseQueryResult } from "@tanstack/react-query";
import { Group } from "./hooks/types";

export const Groups: FC<{ getGroups: UseQueryResult<Group[], Error> }> = ({ getGroups }) => {
  const { data: groups, isLoading } = getGroups;

  return (
    <Accordion title="Groups">
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Box>
            {groups?.map((group) => (
              <GroupRow key={group.id} group={group} />
            ))}
            <AddGroupButton />
          </Box>
        </Box>
      )}
    </Accordion>
  );
};
