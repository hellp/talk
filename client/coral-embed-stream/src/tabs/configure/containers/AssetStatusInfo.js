import React from 'react';
import { gql, compose } from 'react-apollo';
import { withFragments } from 'coral-framework/hocs';
import AssetStatusInfo from '../components/AssetStatusInfo';
import PropTypes from 'prop-types';
import { withUpdateAssetStatus } from 'coral-framework/graphql/mutations';

class AssetStatusInfoContainer extends React.Component {
  openAsset = () =>
    this.props.updateAssetStatus(this.props.asset.id, { closedAt: null });
  closeAsset = () =>
    this.props.updateAssetStatus(this.props.asset.id, {
      closedAt: new Date().toISOString(),
    });

  render() {
    return (
      <AssetStatusInfo
        settings={this.props.asset.settings}
        isClosed={this.props.asset.isClosed}
        closedAt={this.props.asset.closedAt}
        onOpen={this.openAsset}
        onClose={this.closeAsset}
      />
    );
  }
}

AssetStatusInfoContainer.propTypes = {
  asset: PropTypes.object.isRequired,
  updateAssetStatus: PropTypes.func.isRequired,
};

const withAssetStatusInfoFragments = withFragments({
  asset: gql`
    fragment CoralEmbedStream_AssetStatusInfo_asset on Asset {
      id
      closedAt
      isClosed
    }
  `,
});

const enhance = compose(withAssetStatusInfoFragments, withUpdateAssetStatus);

export default enhance(AssetStatusInfoContainer);
