/* eslint-disable node/no-missing-require, node/no-unpublished-require */
const rule = require("../../../lib/rules/handlerNames");
const { RuleTester } = require("eslint");
const { WRONG_HANDLER_NAME_MESSAGE } = require("../../../lib/consts");
const tsParser = require("@typescript-eslint/parser");

const aliasOptions = [
  {
    alias: '@'
  }
];

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true }
    }
  }
});

ruleTester.run("handlerNames", rule, {
  valid: [
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: `            <RefreshButton
              buttonVariant="light"
              isFetching={isFetchingAppsData}
              onStartRefreshMode={onStartRefreshModeHandler}
              appsDataServerLength={appsDataServerLength}
            />`,
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: `            <RefreshButton
              buttonVariant="light"
              isFetching={isFetchingAppsData}
              onStartRefreshMode={() => console.log('helo')}
              appsDataServerLength={appsDataServerLength}
            />`,
      options: aliasOptions,
    },
  ],

  invalid: [
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: `            <RefreshButton
              buttonVariant="light"
              isFetching={isFetchingAppsData}
              onStartRefreshMode={someFreekFunc}
              appsDataServerLength={appsDataServerLength}
            />`,
      errors: [WRONG_HANDLER_NAME_MESSAGE],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: `import s from './AddKeywordsModal.module.scss';
import { Input, Modal } from '@/shared/components';
import { OnAddKeywords, useAddKeywordsModal } from './hooks';
import { AddKeywordsForm } from './addKeywordsForm';

export type PropsAddKeywordsModalBasic = {
  open: boolean;
  openChange: (open: boolean) => void;
  onAddKeywords: OnAddKeywords;
  addKeywordsLoading: boolean;
  addKeywordsError: boolean;
};

export const AddKeywordsModalBasic = ({
  open,
  openChange,
  onAddKeywords,
  addKeywordsLoading,
  addKeywordsError,
}: PropsAddKeywordsModalBasic) => {
  const classNames = {
    modalAddKeys: s.modalAddKeys,
  };

  const {
    isSelectAppsModalOpen,
    modalTitle,
    onOpenChangeHandler,
    onCloseSelectAppsModalHandler,
    nicheModalHeaderVariant,
    nicheModalHeaderPaddingBottom,
    changeIsSelectAppsModalOpenHandler,
    register,
    onClearInputHandler,
    debouncedSearchByApp,
    isErrorAsoMobileApps,
    isFetchingAsoMobileApps,
    isLoadingAsoMobileApps,
    isLoadingAfterErrorAsoMobileApps,
    onRepeatQueryAsoMobileAppsHandler,
    appsList,
    onChangeAppDataHandler,
    loadMoreAppsHandler,
    appsListModified,
    hasNextPage,
  } = useAddKeywordsModal({
    openChange,
  });

  const func = onRepeatQueryAsoMobileAppsHandler;

  const headerBottomChildren = isSelectAppsModalOpen ? (
    <Input
      type="search"
      placeholder="Search by app"
      variant="smGray"
      isNoBorder
      {...register('search')}
      onClearInput={onClearInputHandler}
      fullWidth
    />
  ) : undefined;

  return (
    <Modal
      classNameContent={classNames.modalAddKeys}
      title={modalTitle}
      onOpenChange={onOpenChangeHandler}
      onClickTitle={onCloseSelectAppsModalHandler}
      open={open}
      modalHeaderVariant={nicheModalHeaderVariant}
      headerPaddingBottom={nicheModalHeaderPaddingBottom}
      headerBottomChildren={headerBottomChildren}
      isScroll
      isNextPageExists={hasNextPage}
      modalIsLoading={isFetchingAsoMobileApps || addKeywordsLoading}
    >
      <AddKeywordsForm
        isSelectAppsModalOpen={isSelectAppsModalOpen}
        changeIsSelectAppsModalOpen={changeIsSelectAppsModalOpenHandler}
        searchByApp={debouncedSearchByApp}
        isErrorAsoMobileApps={isErrorAsoMobileApps}
        isFetchingAsoMobileApps={isFetchingAsoMobileApps}
        isLoadingAsoMobileApps={isLoadingAsoMobileApps}
        isLoadingAfterErrorAsoMobileApps={isLoadingAfterErrorAsoMobileApps}
        onRepeatQueryAsoMobileAppsHandler={func}
        appsList={appsList}
        onChangeAppDataHandler={onChangeAppDataHandler}
        loadMoreAppsHandler={loadMoreAppsHandler}
        appsListModified={appsListModified}
        onAddKeywords={onAddKeywords}
        addKeywordsLoading={addKeywordsLoading}
        addKeywordsError={addKeywordsError}
      />
    </Modal>
  );
};
`,
      errors: [WRONG_HANDLER_NAME_MESSAGE],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\tim\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: `import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

import s from './AbTestsTable.module.scss';
import {
  TableBarHeader,
  TableBody,
  TableCell,
  TableHeader,
  TableMain,
  TableRow,
  TooltipComp,
  Typography,
} from '@/shared/components';
import { AppInfo } from './appInfo';
import { TestInfo } from './testInfo';
import { ContentBlock } from './contentBlock';
import { AbTestDomain } from '@/services/testsServices';
import { useAbTestsTable } from './hooks';
import { TestActions } from './testActions';

type Props = {
  testData: AbTestDomain;
} & ComponentPropsWithoutRef<'div'>;

export const AbTestsTable = ({ testData, className, ...rest }: Props) => {
  const {
    tableColumns,
    tableData,
    currentUnitIndex,
    winnerUnitIndex,
    isTestDataExternal,
    sortedTestData,
    onToggleBar,
    getDifWithCurrentUnit,
  } = useAbTestsTable({
    testData,
  });
  const tableRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (tableRef.current) {
        setHasScroll(tableRef.current.scrollWidth > tableRef.current.clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [testData.isTableOpen, tableData]);

  const classNames = {
    tableBarWrapper: clsx(s.tableBarWrapper, className),
    tableRoot: s.tableRoot,
    tableContentMain: clsx(
      s.tableContentMain,
      isTestDataExternal ? s.tableContentMainExternal : s.tableContentMainInternal,
      !isTestDataExternal && hasScroll && s.tableContentMainInternalScroll
    ),
    contentImage: s.contentImage,
    contentCell: s.contentCell,
    contentCurrentCell: s.contentCurrentCell,
    contentRow: s.contentRow,
    testVariantContent: s.testVariantContent,
  };

  const TestVariantTitle = ({ variantName }: { variantName: string; index: number }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const checkTextOverflow = () => {
        if (textRef.current) {
          const { scrollWidth, clientWidth } = textRef.current;
          setShowTooltip(scrollWidth > clientWidth);
        }
      };

      checkTextOverflow();
      window.addEventListener('resize', checkTextOverflow);

      return () => {
        window.removeEventListener('resize', checkTextOverflow);
      };
    }, [variantName]);

    const TriggerComponent = (
      <Typography
        variant="textSm"
        fontColor="primary"
        fontWeight="medium"
        className={classNames.testVariantContent}
        ref={textRef}
      >
        {variantName}
      </Typography>
    );

    if (!showTooltip) {
      return (
        <Typography
          variant="textSm"
          fontColor="primary"
          fontWeight="medium"
          className={classNames.testVariantContent}
          ref={textRef}
        >
          {variantName}
        </Typography>
      );
    } else {
      return (
        <TooltipComp sideOffset={2} isShowArrow={false} triggerComponent={TriggerComponent}>
          <Typography as="h6" variant="textXs" fontWeight="semibold" fontColor="base0">
            {variantName}
          </Typography>
        </TooltipComp>
      );
    }
  };

  return (
    <div className={classNames.tableBarWrapper} {...rest}>
      <TableBarHeader
        elementsOnHeader={[
          <AppInfo testData={testData} isOpen={testData.isTableOpen} />,
          <TestInfo testData={testData} isOpen={testData.isTableOpen} />,
        ]}
        className={classNames.tableRoot}
        onClick={onToggleBar}
      >
        <TestActions
          testData={testData}
          sortedTestData={sortedTestData}
          onToggleBar={onToggleBar}
        />
      </TableBarHeader>
      {testData.isTableOpen && (
        <TableMain className={classNames.tableContentMain} isTableGrid ref={tableRef}>
          <TableHeader columns={tableColumns} isTableGrid />
          <TableBody isTableGrid>
            {tableData.map((row, index) => {
              if (!row) return <></>;
              if (row.type === 'external') {
                return (
                  <TableRow key={row.id} isTableGrid className={classNames.contentRow}>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <TestVariantTitle index={index} variantName={row.variant} />
                    </TableCell>
                    <TableCell
                      className={clsx({
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <ContentBlock testType={testData.test_type} imageUrls={row.imageUrls} />
                    </TableCell>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <Typography
                        variant="textSm"
                        fontColor="primary"
                        fontWeight={index === currentUnitIndex ? 'medium' : 'semibold'}
                      >
                        {row.impression_to_download}
                      </Typography>
                      {getDifWithCurrentUnit({
                        field: 'impression_to_download',
                        index: index,
                      })}
                    </TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow key={row.id} isTableGrid className={classNames.contentRow}>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <TestVariantTitle index={index} variantName={row.variant} />
                    </TableCell>
                    <TableCell
                      className={clsx({
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <ContentBlock testType={testData.test_type} imageUrls={row.imageUrls} />
                    </TableCell>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <Typography
                        variant="textSm"
                        fontColor="primary"
                        fontWeight={index === currentUnitIndex ? 'medium' : 'semibold'}
                      >
                        {row.arpu}
                      </Typography>
                      {getDifWithCurrentUnit({
                        field: 'arpu',
                        index: index,
                      })}
                    </TableCell>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <Typography
                        variant="textSm"
                        fontColor="primary"
                        fontWeight={index === currentUnitIndex ? 'medium' : 'semibold'}
                      >
                        {row.view_to_action}
                      </Typography>
                      {getDifWithCurrentUnit({
                        field: 'view_to_action',
                        index: index,
                      })}
                    </TableCell>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <Typography
                        variant="textSm"
                        fontColor="primary"
                        fontWeight={index === currentUnitIndex ? 'medium' : 'semibold'}
                      >
                        {row.view_to_trial}
                      </Typography>
                      {getDifWithCurrentUnit({
                        field: 'view_to_trial',
                        index: index,
                      })}
                    </TableCell>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <Typography
                        variant="textSm"
                        fontColor="primary"
                        fontWeight={index === currentUnitIndex ? 'medium' : 'semibold'}
                      >
                        {row.view_to_purchase}
                      </Typography>
                      {getDifWithCurrentUnit({
                        field: 'view_to_purchase',
                        index: index,
                      })}
                    </TableCell>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <Typography
                        variant="textSm"
                        fontColor="primary"
                        fontWeight={index === currentUnitIndex ? 'medium' : 'semibold'}
                      >
                        {row.proceeds}
                      </Typography>
                      {getDifWithCurrentUnit({
                        field: 'proceeds',
                        index: index,
                      })}
                    </TableCell>
                    <TableCell
                      className={clsx(classNames.contentCell, {
                        [classNames.contentCurrentCell]: index === winnerUnitIndex,
                      })}
                    >
                      <Typography
                        variant="textSm"
                        fontColor="primary"
                        fontWeight={index === currentUnitIndex ? 'medium' : 'semibold'}
                      >
                        {row.unique_views}
                      </Typography>
                      {getDifWithCurrentUnit({
                        field: 'unique_views',
                        index: index,
                        isChangeColor: true,
                      })}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </TableMain>
      )}
    </div>
  );
};
`,
      errors: [WRONG_HANDLER_NAME_MESSAGE],
      options: aliasOptions,
    },
  ],
});