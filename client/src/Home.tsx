import { UnregisterCallback } from 'history';
import * as React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { allActions } from './all_actions';
import BitsContainer from './BitsContainer';
import CreateBitButton from './CreateBitButton';
import FilterControl from './FilterControl';
import history from './history';
import PageSizeMenu from './PageSizeMenu';
import SortingMenu from './SortingMenu';
import { AppRouteComponent, AppState } from './store';

interface InputProps {}

const mapStateToProps = (state: AppState, ownProps: InputProps) => ({
  bits: state.bits.items,
  optimisticBits: state.bits.optimisticItems,
});

class Home extends AppRouteComponent<typeof mapStateToProps> {
  unregisterHistoryListener: UnregisterCallback;

  componentDidMount() {
    this.props.thunkSetStateFromUrlBar();
    this.unregisterHistoryListener = history.listen((location, action) => {
      this.props.thunkSetStateFromUrlBar();
      this.props.thunkFetchBits();
    });
    this.props.thunkFetchBits(); // maybe get rid of this this looks wrong
  }

  componentWillUnmount() {
    this.unregisterHistoryListener();
  }

  render() {
    const { thunkFetchNextPage, thunkFetchPreviousPage } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col md={4}>
            <CreateBitButton />
            <FilterControl />
          </Col>
          <Col>
            <span>
              <SortingMenu />
              <span style={{ float: 'right' }}>
                <PageSizeMenu />
                <Button onClick={() => thunkFetchPreviousPage()}> &lt; </Button>
                <Button onClick={() => thunkFetchNextPage()}> &gt; </Button>
              </span>
            </span>
            <BitsContainer bits={this.props.optimisticBits} />
            <BitsContainer bits={this.props.bits} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, allActions)(Home);
