import { FC } from "react";
import { Box } from "@mui/material";
import { Accordion } from "../../shared/components/Accordion";
import { GroupRow } from "./GroupRow";
import { AddGroupButton } from "./AddGroupButton";
import { Loading } from "../../shared/components/Loading";
import { useGetGroups } from "./hooks/groupHooks";

export const Groups: FC = () => {
  const { data: groups, isLoading } = useGetGroups();

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
