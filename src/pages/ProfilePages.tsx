

import { Link } from "react-router-dom";

export default function ProfilePages() {

    const profiles = ['InAction', 'HopOnboard', 'WeAre', 'Connect', 'Report', 'Blog', 'Connect Us'];
  return (
    <div>
         {profiles.map((profile) => (
            <Link key={profile} to={`/${profile}`}>
            {profile}
            </Link>
         ))}
    </div>
  )
}
