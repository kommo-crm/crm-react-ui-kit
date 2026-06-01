import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { Accordion, AccordionItemTheme, AccordionTheme } from '..';

import { AccordionSingleImplProps } from '../components/AccordionSingle/AccordionSingle.props';
import { AccordionMultipleImplProps } from '../components/AccordionMultiple/AccordionMultiple.props';

const DATA_ACCORDION_TEST_ID = 'Accordion';
const DATA_ACCORDION_ITEM_TEST_ID = 'AccordionItem';

const defaultItems = [
  {
    value: '1',
    title: 'Item 1',
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores
        voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est
        cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
        libero? Facere reiciendis cumque numquam aperiam architecto sed non
        voluptate molestias distinctio exercitationem est voluptatem debitis,
        ducimus similique ipsum quibusdam error placeat.
      </Text>
    ),
    theme: AccordionItemTheme,
  },
  {
    value: '2',
    title: 'Item 2',
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores
        voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est
        cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
        libero? Facere reiciendis cumque numquam aperiam architecto sed non
        voluptate molestias distinctio exercitationem est voluptatem debitis,
        ducimus similique ipsum quibusdam error placeat.
      </Text>
    ),
    theme: AccordionItemTheme,
  },
  {
    value: '3',
    title: 'Item 3',
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores
        voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est
        cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
        libero? Facere reiciendis cumque numquam aperiam architecto sed non
        voluptate molestias distinctio exercitationem est voluptatem debitis,
        ducimus similique ipsum quibusdam error placeat.
      </Text>
    ),
    theme: AccordionItemTheme,
  },
];

const renderAccordionSingle = (
  props?: Partial<AccordionSingleImplProps>,
  items = defaultItems
) => {
  const onChangeMock = jest.fn();

  const renderResult = render(
    <Accordion
      role="accordion"
      data-testid={DATA_ACCORDION_TEST_ID}
      theme={AccordionTheme}
      type="single"
      onChange={onChangeMock}
      {...props}
    >
      {items.map(({ value, ...rest }) => {
        return (
          <Accordion.Item
            data-testid={DATA_ACCORDION_ITEM_TEST_ID}
            key={value}
            value={value}
            {...rest}
          />
        );
      })}
    </Accordion>
  );

  return { ...renderResult, onChangeMock };
};

describe('AccordionSingle', () => {
  it('should be defined', () => {
    expect(renderAccordionSingle).toBeDefined();
  });

  it('should apply custom css properties', async () => {
    const className = 'my-class';

    renderAccordionSingle({ className });

    const accordion = screen.getByTestId(DATA_ACCORDION_TEST_ID);

    expect(accordion).toHaveClass(className);
    /**
     * 1. Modular className
     * 2. Theme className
     * 3. Additional class `my-class`
     */
    expect(accordion.classList).toHaveLength(3);
  });

  it('should renders the Accordion component', () => {
    renderAccordionSingle();

    const accordion = screen.getByTestId(DATA_ACCORDION_TEST_ID);

    expect(accordion).toBeInTheDocument();
  });

  it('should open item by click and remain open by click again if not collapsible', () => {
    const { onChangeMock } = renderAccordionSingle({ isCollapsible: false });

    const itemHeaderText = screen.getByText(defaultItems[0].title);

    fireEvent.click(itemHeaderText);

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value);

    const items = screen.getAllByTestId(DATA_ACCORDION_ITEM_TEST_ID);

    expect(items[0]).toHaveClass('active');

    fireEvent.click(itemHeaderText);

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value);

    expect(items[0]).toHaveClass('active');
  });

  it('should open item by click and close click again if collapsible', () => {
    const { onChangeMock } = renderAccordionSingle({ isCollapsible: true });

    const itemHeaderText = screen.getByText(defaultItems[0].title);

    fireEvent.click(itemHeaderText);

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value);

    const items = screen.getAllByTestId(DATA_ACCORDION_ITEM_TEST_ID);

    expect(items[0]).toHaveClass('active');

    fireEvent.click(itemHeaderText);

    expect(onChangeMock).toHaveBeenCalledWith(defaultItems[0].value);

    expect(items[0]).not.toHaveClass('active');
  });
});

const renderAccordionMultiple = (
  props?: Partial<AccordionMultipleImplProps>,
  items = defaultItems
) => {
  const onChangeMock = jest.fn();

  const renderResult = render(
    <Accordion
      role="accordion"
      data-testid={DATA_ACCORDION_TEST_ID}
      theme={AccordionTheme}
      type="multiple"
      onChange={onChangeMock}
      {...props}
    >
      {items.map(({ value, ...rest }) => {
        return (
          <Accordion.Item
            data-testid={DATA_ACCORDION_ITEM_TEST_ID}
            key={value}
            value={value}
            {...rest}
          />
        );
      })}
    </Accordion>
  );

  return { ...renderResult, onChangeMock };
};

describe('AccordionMultiple', () => {
  it('should be defined', () => {
    expect(renderAccordionMultiple).toBeDefined();
  });

  it('should apply custom css properties', async () => {
    const className = 'my-class';

    renderAccordionMultiple({ className });

    const accordion = screen.getByTestId(DATA_ACCORDION_TEST_ID);

    expect(accordion).toHaveClass(className);
    /**
     * 1. Modular className
     * 2. Theme className
     * 3. Additional class `my-class`
     */
    expect(accordion.classList).toHaveLength(3);
  });

  it('should renders the Accordion component', () => {
    renderAccordionMultiple();

    const accordion = screen.getByTestId(DATA_ACCORDION_TEST_ID);

    expect(accordion).toBeInTheDocument();
  });

  it('should open and close several items at once', () => {
    const { onChangeMock } = renderAccordionMultiple();

    const firstItemHeaderText = screen.getByText(defaultItems[0].title);

    fireEvent.click(firstItemHeaderText);

    expect(onChangeMock).toHaveBeenCalledWith([defaultItems[0].value]);

    const items = screen.getAllByTestId(DATA_ACCORDION_ITEM_TEST_ID);

    expect(items[0]).toHaveClass('active');

    const secondItemHeaderText = screen.getByText(defaultItems[1].title);

    fireEvent.click(secondItemHeaderText);

    expect(onChangeMock).toHaveBeenLastCalledWith([
      defaultItems[0].value,
      defaultItems[1].value,
    ]);

    expect(items[0]).toHaveClass('active');
    expect(items[1]).toHaveClass('active');

    fireEvent.click(firstItemHeaderText);

    expect(onChangeMock).toHaveBeenLastCalledWith([defaultItems[1].value]);

    expect(items[0]).not.toHaveClass('active');
    expect(items[1]).toHaveClass('active');
  });
});
