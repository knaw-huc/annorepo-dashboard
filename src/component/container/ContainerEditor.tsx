import { InputWithLabel } from "../common/form/InputWithLabel.tsx";
import { usePost } from "../../client/query/usePost.tsx";
import { H1 } from "../common/H1.tsx";
import { ArContainer } from "../../model/ArModel.ts";
import { toContainerName } from "../../util/toContainerName.ts";
import { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { isString } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { MR } from "../../client/query/MR.tsx";
import { NeutralButton } from "../common/NeutralButton.tsx";

export function ContainerEditor(props: {
  onClose: () => void;
  onCreate: (annotationName: string) => void;
}) {
  const queryClient = useQueryClient();

  const [slug, setSlug] = useState("");
  const [form, setForm] = useState(cloneDeep(defaultForm));
  const [error, setError] = useState<string>("");

  const createContainer: MR<ArContainer> = usePost("/w3c");

  const handleSubmit = () => {
    if (error) {
      return;
    }
    const mutationBody = {
      ...form,
      // openapi type says string but AR api expects json:
      type: JSON.parse(form.type),
    } as unknown as string;

    createContainer.mutate(
      {
        params: {
          header: { Slug: slug },
        },
        body: mutationBody,
      },
      {
        onSuccess: async (data) => {
          await queryClient.invalidateQueries({ queryKey: ["/my/containers"] });
          props.onCreate(toContainerName(data.id));
        },
      },
    );
  };

  function handleChangeFormType(update: string) {
    let parsed: string[];
    let errorUpdate = "";
    try {
      parsed = JSON.parse(update);
      if (!Array.isArray(parsed) || !parsed.every((el) => isString(el))) {
        errorUpdate = "Please enter an array of strings";
      }
    } catch {
      errorUpdate = "Please enter valid json";
    }
    setError(errorUpdate);
    setForm((prev) => ({ ...prev, type: update }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <H1>Create container</H1>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <InputWithLabel
                value={form.label}
                label="Label"
                onChange={(label) => setForm((prev) => ({ ...prev, label }))}
                className="mt-5"
              />

              <InputWithLabel
                value={slug || ""}
                label="Name"
                onChange={(slug) => setSlug(slug)}
                className="mt-5"
              />
              <div className="mt-5">
                <InputWithLabel
                  label="Type"
                  errorLabel={error}
                  value={form.type}
                  onChange={handleChangeFormType}
                />
              </div>
              <div className="mt-5">
                <NeutralButton
                  disabled={!!error}
                  onClick={handleSubmit}
                  className="mr-5"
                >
                  Create
                </NeutralButton>
                <NeutralButton onClick={props.onClose}>Close</NeutralButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

const defaultForm: ContainerPost = {
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://www.w3.org/ns/ldp.jsonld",
  ],
  type: '["Annotation", "SomethingElse"]',
  label: "",
  readOnlyForAnonymousUsers: true,
};

type ContainerPost = Omit<
  ArContainer,
  "id" | "via" | "last" | "first" | "total" | "type"
> & {
  // String needs to be converted in json array:
  type: string;
};
