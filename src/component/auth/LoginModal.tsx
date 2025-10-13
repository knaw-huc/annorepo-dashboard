import { Modal } from "../Modal.tsx";
import { LoginMenu } from "./LoginMenu.tsx";

export function LoginModal(props: { onClose: () => void }) {
  return (
    <Modal onClose={props.onClose}>
      <LoginMenu {...props} />
    </Modal>
  );
}
