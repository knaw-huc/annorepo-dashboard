import { UserRole } from "../../model/user/UserRole.tsx";
import { useState } from "react";
import { CloseButton } from "./CloseButton.tsx";
import { H2 } from "../common/H2.tsx";
import { InputWithLabel } from "../common/form/InputWithLabel.tsx";
import { DropdownSelector } from "../common/form/DropdownSelector.tsx";
import { Button } from "../common/Button.tsx";

export function AddUserModal(props: {
  onClose: () => void;
  onAdd: (userName: string, role: UserRole) => void;
}) {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(UserRole.GUEST);

  const roleOptions = [UserRole.GUEST, UserRole.EDITOR, UserRole.ADMIN].map(
    (r) => ({ value: r, label: r.toLowerCase() }),
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg p-5 w-100">
        <CloseButton onClick={props.onClose} />
        <H2>Add user</H2>
        <div className="flex flex-col p-3">
          <InputWithLabel
            value={userName}
            label="Username"
            onChange={setUserName}
          />
          <DropdownSelector
            selectedValue={role}
            options={roleOptions}
            onSelect={(update) => setRole(update.value)}
          />
          <Button
            onClick={() => props.onAdd(userName, role)}
            className="mt-3"
            disabled={!userName}
          >
            Add to container
          </Button>
        </div>
      </div>
    </div>
  );
}
