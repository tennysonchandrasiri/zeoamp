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
  const currentYear = new Date().getFullYear();

  const visibleResources = createMemo(() => {
    const query = searchTerm().trim().toLocaleLowerCase();

    return content[activeGrade()].filter((resource) => {
      const searchableText = `${resource.grade} ${resource.subject} ${resource.description}`;
      return searchableText.toLocaleLowerCase().includes(query);
    });
  });

  return (
    <>
      <Title>ZEO Ampara — ඉගෙනුම් සම්පත්</Title>
      <Meta
        name="description"
        content="ZEO Ampara වෙතින් 6 සිට 11 ශ්‍රේණිය දක්වා සිසුන් සඳහා කාර්ය පත්‍රිකා සහ ඉගෙනුම් සම්පත්."
      />

      <a class="skip-link" href="#main-content">
        ප්‍රධාන අන්තර්ගතයට යන්න
      </a>

      <header class="site-header">
        <div class="site-header__inner page-width">
          <a class="brand" href="#top" aria-label="ZEO Ampara මුල් පිටුව">
            <img src={publicAsset('favicon.jpg')} width="44" height="44" alt="" />
            <span class="brand__text">
              <strong lang="en">ZEO Ampara</strong>
              <span>කලාප අධ්‍යාපන කාර්යාලය</span>
            </span>
          </a>
          <nav class="site-nav" aria-label="ප්‍රධාන මෙනුව">
            <a href="#resources">සම්පත්</a>
            <a href="#about">අප ගැන</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section class="hero page-width" id="top" aria-labelledby="hero-title">
          <p class="eyebrow hero__eyebrow">
            අම්පාර කලාප අධ්‍යාපන කාර්යාලය
          </p>
          <h1 id="hero-title">
            ඉගෙනුම එකම තැනකින්, <em>සෑම ශ්‍රේණියකටම.</em>
          </h1>
          <p class="hero__copy" lang="si">
            අම්පාර කලාපයේ සිසුන් සඳහා සකස් කළ කාර්ය පත්‍රිකා සහ ඉගෙනුම් සම්පත්.
          </p>
          <div class="hero__actions">
            <ButtonLink href="#resources" variant="solid" class="hero__primary-link">
              සම්පත් බලන්න
            </ButtonLink>
            <ButtonLink href="#about" variant="outline">
              ZEO Ampara ගැන
            </ButtonLink>
          </div>
          <div class="hero__facts" aria-label="සම්පත් එකතුව පිළිබඳ තොරතුරු">
            <div>
              <strong>06—11</strong>
              <span>ශ්‍රේණි</span>
            </div>
            <span class="hero__fact-divider" aria-hidden="true" />
            <div>
              <strong>{totalResources}</strong>
              <span>විෂය සංග්‍රහ</span>
            </div>
          </div>
        </section>

        <section class="library page-width" id="resources" aria-labelledby="library-title">
          <div class="library__heading">
            <div>
              <h2 id="library-title">විෂය සංග්‍රහයක් තෝරන්න.</h2>
              <p class="library__intro" lang="si">
                ශ්‍රේණිය තෝරාගෙන ඔබට අවශ්‍ය විෂය සොයන්න.
              </p>
            </div>
            <span class="resource-total">
              <span>{totalResources}</span> සම්පත්
            </span>
          </div>

          <div class="library-controls">
            <div class="grade-picker" role="group" aria-label="ශ්‍රේණිය අනුව සම්පත් තෝරන්න">
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
              <span class="visually-hidden">විෂය හෝ සම්පත් සොයන්න</span>
              <input
                type="search"
                name="resource-search"
                autocomplete="off"
                placeholder="විෂය හෝ සම්පත් සොයන්න"
                value={searchTerm()}
                onInput={(event) => setSearchTerm(event.currentTarget.value)}
              />
              <kbd aria-hidden="true">⌕</kbd>
            </label>
          </div>

          <div class="results-line">
            <p aria-live="polite">
              <span>{visibleResources().length}</span>{' '}
              විෂය සංග්‍රහ — {activeGrade()} ශ්‍රේණිය සඳහා
            </p>
            <span class="results-line__note">නරඹන්න හෝ බාගන්න</span>
          </div>

          <Show
            when={visibleResources().length > 0}
            fallback={
              <div class="empty-state">
                <p class="eyebrow">ගැළපෙන සම්පත් හමු නොවීය</p>
                <h3>වෙනත් වචනයකින් සොයන්න.</h3>
                <p>විෂය නාමයක් සොයන්න හෝ දැනට ඇති සෙවුම මකන්න.</p>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  සෙවුම මකන්න
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
            <div class="office-note__copy">
              <h2 id="about-title">අම්පාරේ සිසුන්ට සමීප ඉගෙනුම් සම්පත්.</h2>
              <p lang="si">
                අම්පාර කලාප අධ්‍යාපන කාර්යාලය විසින් සිසුන්ට පහසුවෙන් ප්‍රවේශ විය හැකි ලෙස සකස් කළ
                කාර්ය පත්‍රිකා සහ ඉගෙනුම් සම්පත්.
              </p>
              <div class="office-note__actions">
                <ButtonLink
                  href="https://tennysonchandrasiri.github.io/twootle/"
                  variant="solid"
                  external
                >
                  අපෙන් තවත්
                </ButtonLink>
                <ButtonLink
                  href="https://web.facebook.com/ZEOAmpara/?_rdc=1&_rdr#"
                  variant="outline"
                  external
                >
                  අපගේ පිටුවට පිවිසෙන්න
                </ButtonLink>
                <ButtonLink href="mailto:amp@edudept.ep.gov.lk" variant="outline">
                  <span lang="en">amp@edudept.ep.gov.lk</span>
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="page-width site-footer__inner">
          <a class="footer-brand" href="#top" lang="en">ZEO Ampara</a>
          <p>© {currentYear} ZEO Ampara. සියලු හිමිකම් ඇවිරිණි.</p>
        </div>
      </footer>
    </>
  );
}
