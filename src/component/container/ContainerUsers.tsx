import { useContainerUsers } from "../../client/endpoint/useContainerUsers.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { H2 } from "../common/H2.tsx";
import { Badge } from "../common/Badge.tsx";
import { Button } from "../common/Button.tsx";
import { Add } from "../common/icon/Add.tsx";
import { useState } from "react";
import { MR } from "../../client/query/MR.tsx";
import { ArUser } from "../../model/ArModel.ts";
import { usePost } from "../../client/query/usePost.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Warning } from "../common/Warning.tsx";
import { AddUserModal } from "./AddUserModal.tsx";

export function ContainerUsers(props: { name: string }) {
  const { name } = props;
  const containerUsers = useContainerUsers(name);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const addUserToContainer: MR<ArUser> = usePost(
    "/services/{containerName}/users",
  );

  const handleSubmitAddUser = (userName: string, role: UserRole) => {
    addUserToContainer.mutate(
      {
        params: {
          path: { containerName: name },
        },
        body: [{ userName, role }] as unknown as string,
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ["/services/{containerName}/users"],
          }),
        onError: (e) =>
          setError(`Could not add user to container: ${e.message}`),
      },
    );
    setShowAddUserModal(false);
  };

  if (!containerUsers.isSuccess) {
    return <StatusMessage requests={[containerUsers]} />;
  }

  function handleAddUser() {
    setShowAddUserModal(true);
  }

  return (
    <div>
      {error && <Warning onClose={() => setError("")}>{error}</Warning>}
      <H2>Users</H2>
      <Button onClick={handleAddUser} className="mr-2">
        Add
        <Add className="ml-1" />
      </Button>

      <div>
        {containerUsers.data.map((u) => (
          // TODO:
          // <span onClick={handleRemoveUser}>
          <Badge key={u.userName} className="mr-2 mt-3">
            {u.userName} ({u.role.toLowerCase()})
          </Badge>
          // </span>
        ))}
      </div>
      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          onAdd={handleSubmitAddUser}
        />
      )}
    </div>
  );
}
