import type { Resource } from '../data/assets';
import { coverAsset, downloadUrl, viewUrl } from '../data/assets';
import { ButtonLink } from './ButtonLink';

type ResourceCardProps = {
  resource: Resource;
};

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.75v9.5m0 0 3.25-3.5M10 12.25l-3.25-3.5M3.75 14.25v2h12.5v-2" />
    </svg>
  );
}

function OpenIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M11.25 3.75h5v5m-.5-4.5-7 7" />
      <path d="M15.25 10.75v4.5h-11v-11h4.5" />
    </svg>
  );
}

export function ResourceCard(props: ResourceCardProps) {
  return (
    <article class="resource-card">
      <div class="resource-card__cover">
        <img
          src={coverAsset(props.resource.img)}
          alt={`${props.resource.subject} විෂය ආවරණය`}
          loading="lazy"
          decoding="async"
          width="350"
          height="500"
          lang="si"
        />
      </div>
      <div class="resource-card__body">
        <div class="resource-card__metadata">
          <span class="subject-badge" lang="si">
            {props.resource.subject}
          </span>
          <span class="grade-label" lang="si">
            {props.resource.grade}
          </span>
        </div>
        <h3 lang="si">{props.resource.subject}</h3>
        <p lang="si">{props.resource.description}</p>
        <div class="resource-card__actions">
          <ButtonLink
            href={downloadUrl(props.resource.link)}
            variant="solid"
            external
            class="resource-action"
          >
            <DownloadIcon />
            <span>බාගන්න</span>
          </ButtonLink>
          <ButtonLink
            href={viewUrl(props.resource.link)}
            variant="outline"
            external
            class="resource-action"
          >
            <OpenIcon />
            <span>නරඹන්න</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
