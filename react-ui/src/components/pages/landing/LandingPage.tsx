import React from 'react';
import HeroLanding from './hero/HeroLanding';
import Footer from '../../layout/generic/footer/Footer';
import { LayoutLanding } from '../../layout/landing/LayoutLanding';
import { BaseContainer } from '../../styled/containers';
import {
  SectionBackground,
  SectionBase,
  SectionGradientBase,
} from '../../styled/sections';
// icons
import { LandingPageIconGrid } from './IconGrid';
import { SecondaryTitle } from '../../styled/typography';
import Navigation from './Navigation';
import { HomepageStory } from './Story';
import { HomepageControl } from './HomepageControl';

const LandingPage = () => {
  return (
    <LayoutLanding>
      <Navigation />
      <HeroLanding />
      <SectionGradientBase>
        <BaseContainer>
          <SecondaryTitle color="dark" textAlign="center">
            What Bit Guard does for you
          </SecondaryTitle>
          <LandingPageIconGrid />
        </BaseContainer>
      </SectionGradientBase>
      <SectionBackground>
        <BaseContainer>
          <HomepageStory />
        </BaseContainer>
      </SectionBackground>
      <SectionBase>
        <BaseContainer>
          <HomepageControl />
        </BaseContainer>
      </SectionBase>
      <Footer />
    </LayoutLanding>
  );
};

export { LandingPage };
