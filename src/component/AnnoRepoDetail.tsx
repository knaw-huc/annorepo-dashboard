import {H1} from "./common/H1.tsx";
import {Loading} from "./index.ts";
import {Card} from "./common/Card.tsx";
import {A} from "./common/A.tsx";
import {External} from "./common/icon/External.tsx";
import {useAbout} from "../client/endpoint/useAbout.tsx";
import {StatusMessage} from "./common/StatusMessage.tsx";

export function AnnoRepoDetail() {
  const aboutRequest = useAbout();
  if(!aboutRequest.isSuccess) {
    return <StatusMessage requests={[aboutRequest]} />
  }
  const about = aboutRequest.data
  return <div>
    {about
      ? <>
        <H1>{about.appName}</H1>
        <div className="grid grid-cols-5 gap-5">
          <Card
            header={<p className="text-sm text-slate-500">AnnoRepo Version</p>}
          >
            <p className="font-bold">
              {about.version}
            </p>
          </Card>
          <Card
            header={<p className="text-sm text-slate-500">Running since</p>}
          >
            <p className="font-bold">
              {new Date(about.startedAt).toLocaleString()}
            </p>
          </Card>
          <Card
            className="col-span-2"
            header={<p className="text-sm text-slate-500">Running at</p>}
          >
            <A href={about.baseURI} className="font-bold">
              {about.baseURI}
              <External className="ml-1"/>
            </A>
          </Card>
        </div>
      </>
      : <Loading/>
    }
  </div>
}