import { Meta, Title } from '@solidjs/meta';
import { For, Show, createMemo, createSignal } from 'solid-js';
import { Button } from './components/Button';
import { ButtonLink } from './components/ButtonLink';
import { GradeOption } from './components/GradeOption';
import { ResourceCard } from './components/ResourceCard';
import { content, grades, publicAsset, totalResources, type Grade } from './data/assets';
import './App.css';

export default function App() {
  const [activeGrade, setActiveGrade] = createSignal<Grade>(6);
  const [searchTerm, setSearchTerm] = createSignal('');

  const visibleResources = createMemo(() => {
    const query = searchTerm().trim().toLocaleLowerCase();

    return content[activeGrade()].filter((resource) => {
      const searchableText = `${resource.grade} ${resource.subject} ${resource.description}`;
      return searchableText.toLocaleLowerCase().includes(query);
    });
  });

  return (
    <>
      <Title>ZEO Ampara — Learning resources</Title>
      <Meta
        name="description"
        content="Explore worksheet collections for Grades 6 to 11 from ZEO Ampara."
      />

      <a class="skip-link" href="#main-content">
        Skip to content
      </a>

      <header class="site-header">
        <div class="site-header__inner page-width">
          <a class="brand" href="#top" aria-label="ZEO Ampara home">
            <img src={publicAsset('favicon.jpg')} width="44" height="44" alt="" />
            <span class="brand__text">
              <strong>ZEO Ampara</strong>
              <span>Zone Education Office</span>
            </span>
          </a>
          <nav class="site-nav" aria-label="Main navigation">
            <a href="#resources">Resources</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section class="hero page-width" id="top" aria-labelledby="hero-title">
          <p class="eyebrow hero__eyebrow">
            <span class="eyebrow-mark" aria-hidden="true" />
            Zone Education Office <span aria-hidden="true">·</span> Ampara
          </p>
          <h1 id="hero-title">
            Learning, gathered <em>for every grade.</em>
          </h1>
          <p class="hero__copy" lang="si">
            අම්පාර කලාපයේ දරුවන් සඳහා සකස් කළ අධ්‍යාපන සම්පත් එකම තැනකින්.
          </p>
          <div class="hero__actions">
            <ButtonLink href="#resources" variant="ghost" class="hero__primary-link">
              Explore the library <span aria-hidden="true">↓</span>
            </ButtonLink>
            <ButtonLink href="#about" variant="outline">
              About ZEO Ampara
            </ButtonLink>
          </div>
          <div class="hero__facts" aria-label="Library summary">
            <div>
              <strong>06—11</strong>
              <span>Grade levels</span>
            </div>
            <span class="hero__fact-divider" aria-hidden="true" />
            <div>
              <strong>{totalResources}</strong>
              <span>Study collections</span>
            </div>
            <span class="sage-status">
              <span class="status-dot" aria-hidden="true" />
              Open access
            </span>
          </div>
        </section>

        <section class="library page-width" id="resources" aria-labelledby="library-title">
          <div class="library__heading">
            <div>
              <p class="eyebrow">The resource library</p>
              <h2 id="library-title">Choose a collection.</h2>
              <p class="library__intro" lang="si">
                ශ්‍රේණිය තෝරාගෙන ඔබට අවශ්‍ය විෂය සොයන්න.
              </p>
            </div>
            <span class="resource-total">
              <span>{totalResources}</span> collections
            </span>
          </div>

          <div class="library-controls">
            <div class="grade-picker" role="group" aria-label="Filter resources by grade">
              <For each={grades}>
                {(grade) => (
                  <GradeOption
                    grade={grade}
                    selected={activeGrade() === grade}
                    onSelect={setActiveGrade}
                  />
                )}
              </For>
            </div>
            <label class="search-box">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <circle cx="8.75" cy="8.75" r="5.75" />
                <path d="m13 13 4 4" />
              </svg>
              <span class="visually-hidden">Search by subject or collection</span>
              <input
                type="search"
                name="resource-search"
                autocomplete="off"
                placeholder="Search by subject or collection"
                value={searchTerm()}
                onInput={(event) => setSearchTerm(event.currentTarget.value)}
              />
              <kbd aria-hidden="true">⌕</kbd>
            </label>
          </div>

          <div class="results-line">
            <p aria-live="polite">
              <span>{visibleResources().length}</span>{' '}
              {visibleResources().length === 1 ? 'collection' : 'collections'} for Grade{' '}
              {activeGrade()}
            </p>
            <span class="results-line__note">All resources open in Google Drive</span>
          </div>

          <Show
            when={visibleResources().length > 0}
            fallback={
              <div class="empty-state">
                <p class="eyebrow">No matches found</p>
                <h3>Try another search.</h3>
                <p>Search using a subject name or clear the current filter.</p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear search
                </Button>
              </div>
            }
          >
            <div class="resource-grid">
              <For each={visibleResources()}>
                {(resource) => <ResourceCard resource={resource} />}
              </For>
            </div>
          </Show>
        </section>

        <section class="office-note" id="about" aria-labelledby="about-title">
          <div class="page-width office-note__inner">
            <div class="office-note__label">
              <span class="eyebrow-mark" aria-hidden="true" />
              <p class="eyebrow">A shared learning library</p>
            </div>
            <div class="office-note__copy">
              <h2 id="about-title">Open learning, close to home.</h2>
              <p lang="si">
                අම්පාර කලාප අධ්‍යාපන කාර්යාලය විසින් සිසුන්ට පහසුවෙන් ප්‍රවේශ විය හැකි ලෙස සකස් කළ
                කාර්ය පත්‍රිකා සහ ඉගෙනුම් සම්පත්.
              </p>
            </div>
            <div class="office-note__mark" aria-hidden="true">ZEO<br />AMPARA</div>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="page-width site-footer__inner">
          <a class="footer-brand" href="#top">ZEO Ampara</a>
          <p>Zone Education Office · Ampara</p>
          <a class="back-to-top" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </>
  );
}
