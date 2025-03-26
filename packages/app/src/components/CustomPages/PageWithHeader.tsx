import React, { PropsWithChildren, ComponentProps } from 'react';
import { Header } from './Header';
import { Page } from './Page';


export function PageWithHeader(props: PropsWithChildren<ComponentProps<typeof Header>>) {
  const { children, ...restProps } = props;
  return (
    <Page>
      <Header {...restProps} />
      {children}
    </Page>
  );
}
