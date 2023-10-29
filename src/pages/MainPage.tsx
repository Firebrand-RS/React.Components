import React, { ComponentProps } from 'react';
import classes from './MainPage.module.scss';
import { TMDBMovieSearcher } from '../app/widgets/TMDBMovieSearcher/TMDBMovieSearcher';
import { PageWrapper } from '../shared/ui/PageWrapper/PageWrapper';

interface MainPageProps extends ComponentProps<'div'> {}

export class MainPage extends React.Component<MainPageProps> {
  render() {
    return (
      <main {...this.props} className={classes.page}>
        <PageWrapper>
          <h1 className="visually-hidden">React Component Task</h1>
          <TMDBMovieSearcher />
        </PageWrapper>
      </main>
    );
  }
}
