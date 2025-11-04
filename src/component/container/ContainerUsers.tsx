import { useContainerUsers } from "../../client/endpoint/useContainerUsers.tsx";
import { StatusMessage } from "../common/StatusMessage.tsx";
import { useState } from "react";
import { MR } from "../../client/query/MR.tsx";
import { ArUser } from "../../model/ArModel.ts";
import { usePost } from "../../client/query/usePost.tsx";
import { UserRole } from "../../model/user/UserRole.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { Warning } from "../common/Warning.tsx";
import { AddUserModal } from "./AddUserModal.tsx";
import { useDelete } from "../../client/query/useDelete.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";
import { Bin } from "../common/icon/Bin.tsx";

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

  function handleRemove(userName: string) {
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
      <div className="flex gap-4 items-center justify-end my-4">
        <div className="flex gap-4">
          <NeutralButton onClick={handleAddUser}>Add user</NeutralButton>
        </div>
      </div>

      <div className="w-full gap-2 border-t border-neutral-200">
        {containerUsers.data.map((user) => (
          <ContainerUser
            user={user}
            onRemove={() => handleRemove(user.userName)}
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

export function ContainerUser(props: { user: ArUser; onRemove: () => void }) {
  return (
    <li className="w-full flex gap-8 py-2 border-b border-neutral-100">
      <div className="font-bold w-1/4">{props.user.userName}</div>
      <div className="text-neutral-600 w-1/4">
        {props.user.role.toLowerCase()}
      </div>
      <div className="text-neutral-600 grow text-right">
        <NeutralButton onClick={props.onRemove}>
          <Bin />
        </NeutralButton>
      </div>
    </li>
  );
}
