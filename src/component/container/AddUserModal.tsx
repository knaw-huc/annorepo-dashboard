import { UserRole } from "../../model/user/UserRole.tsx";
import { useState } from "react";
import { CloseButton } from "./CloseButton.tsx";
import { H2 } from "../common/H2.tsx";
import { InputWithLabel } from "../common/form/InputWithLabel.tsx";
import { DropdownSelector } from "../common/form/DropdownSelector.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";

export function AddUserModal(props: {
  onClose: () => void;
  onAdd: (userName: string, role: UserRole) => void;
}) {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState(UserRole.EDITOR);

  const roleOptions = [UserRole.EDITOR, UserRole.ADMIN].map((r) => ({
    value: r,
    label: r.toLowerCase(),
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg p-5 w-100">
        <CloseButton onClick={props.onClose} />
        <H2>Add user</H2>
        <div className="flex flex-col gap-4">
          <InputWithLabel
            value={userName}
            label="Username"
            onChange={setUserName}
          />
          <DropdownSelector
            selectedValue={role}
            options={roleOptions}
            onSelect={(update) => setRole(update.value)}
            className="w-full"
            selectClassName="w-full"
          />
          <NeutralButton
            onClick={() => props.onAdd(userName, role)}
            disabled={!userName}
          >
            Add to container
          </NeutralButton>
        </div>
      </div>
    </div>
  );
}
