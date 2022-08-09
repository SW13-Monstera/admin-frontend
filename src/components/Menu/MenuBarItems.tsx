import ShortTextIcon from '@mui/icons-material/ShortText';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LabelIcon from '@mui/icons-material/Label';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { URL } from '../../constants/url';
import { List, Collapse } from '@mui/material';
import { MenuBarListElement } from './MenuBarListElement';
import { MenuBarTitle } from './MenuBarTitle';
import { useNestedMenu } from '../../hooks/useNestedMenu';

export const MenuBarItems = () => {
  const { open: problemMenuOpen, handleClick: handleProblemMenu } = useNestedMenu();
  const { open: dataMenuOpen, handleClick: handleDataMenu } = useNestedMenu();
  const { open: userMenuOpen, handleClick: handleUserMenu } = useNestedMenu();

  return (
    <>
      <MenuBarTitle text='문제 관리' open={problemMenuOpen} handleClick={handleProblemMenu} />
      <Collapse in={problemMenuOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <MenuBarListElement
            text='서술형'
            icon={<StickyNote2Icon />}
            url={URL.LONG_PROBLEM_LIST}
          />
          <MenuBarListElement text='단답형' icon={<ShortTextIcon />} url={URL.SHORT_PROBLEM_LIST} />
          <MenuBarListElement text='객관식' icon={<FormatListNumberedIcon />} />
        </List>
      </Collapse>
      <MenuBarTitle text='AI 데이터 관리' open={dataMenuOpen} handleClick={handleDataMenu} />
      <Collapse in={dataMenuOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <MenuBarListElement text='라벨링' icon={<LabelIcon />} url={URL.LABELING_DATA_LIST} />
          <MenuBarListElement text='검수' icon={<SearchIcon />} url={URL.VALIDATING_DATA_LIST} />
          <MenuBarListElement text='완료' icon={<DoneAllIcon />} url={URL.DONE_DATA_LIST} />
        </List>
      </Collapse>
      <MenuBarTitle text='사용자 관리' open={userMenuOpen} handleClick={handleUserMenu} />
      <Collapse in={userMenuOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <MenuBarListElement text='전체 사용자' icon={<PeopleAltIcon />} url={URL.USER} />
        </List>
      </Collapse>
    </>
  );
};
