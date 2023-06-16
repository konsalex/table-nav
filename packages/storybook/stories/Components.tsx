import { ReactNode } from 'react';
import { Unstyled } from '@storybook/addon-docs';

export const StoryCard = (props: {
  title: string;
  link: string;
  children: ReactNode;
}) => {
  const { link, children, title } = props;
  return (
    <Unstyled>
      <a
        href={link}
        className="flex flex-col gap-4 cursor-pointer p-4 border border-neutral-200 rounded-lg hover:scale-105 transition-all duration-200 hover:shadow"
        style={{
          height: '250px',
          width: '250px',
        }}
      >
        <h5>{title}</h5>
        <p>{children}</p>
      </a>
    </Unstyled>
  );
};

export const Pill = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <Unstyled>
      <span className="px-3 py-1.5 text-sm font-semibold text-neutral-700 bg-neutral-100 rounded-full block border border-neutral-200">
        {children}
      </span>
    </Unstyled>
  );
};
