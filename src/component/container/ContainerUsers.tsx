import { useContainerUsers } from "../../client/endpoint/useContainerUsers.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { H2 } from "../common/H2.tsx";
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
import { useDelete } from "../../client/query/useDelete.tsx";
import { Close } from "../common/icon/Close.tsx";
import { Badge } from "../annotation/Badge.tsx";

export function ContainerUsers(props: { containerName: string }) {
  const { containerName } = props;
  const containerUsers = useContainerUsers(containerName);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const addUserToContainer: MR<ArUser> = usePost(
    "/services/{containerName}/users",
  );
  const removeUserFromContainer = useDelete(
    "/services/{containerName}/users/{userName}",
  );

  const handleSubmitAddUser = (userName: string, role: UserRole) => {
    addUserToContainer.mutate(
      {
        params: {
          path: { containerName },
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

  function handleAddUser() {
    setShowAddUserModal(true);
  }

  function handleClickRemoveUser(userName: string) {
    if (!window.confirm("Remove user from container?")) {
      return;
    }
    removeUserFromContainer.mutate(
      {
        params: {
          path: { containerName, userName },
        },
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
  }

  if (!containerUsers.isSuccess) {
    return <StatusMessage name="container users" requests={[containerUsers]} />;
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
          <Badge
            key={u.userName}
            label={
              <>
                {u.userName} ({u.role.toLowerCase()})
                <span onClick={() => handleClickRemoveUser(u.userName)}>
                  <Close className="align-top" />
                </span>
              </>
            }
          />
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
