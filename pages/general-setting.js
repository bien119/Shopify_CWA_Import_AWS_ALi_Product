// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/cwa_import_db');

import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  Select,
  TextStyle,
} from '@shopify/polaris';

class AnnotatedLayout extends React.Component {
  state = {
    awsTag: '',
    awsAccessKey: '',
    awsSecretKey: '',
    selected: 'US',
    enabled: false,
    aliApiKey: '',
    aliTrackingKey: '',
    aliDigitalSign: '',
  };

  render() {
    const { awsTag, awsAccessKey, awsSecretKey, selected, enabled, aliApiKey, aliTrackingKey, aliDigitalSign } = this.state;
    const contentStatus = enabled ? 'Disable' : 'Enable';
    const textStatus = enabled ? 'enabled' : 'disabled';

    const options = [
      {label: 'Brazil', value: 'BR'},
      {label: 'Canada', value: 'CA'},
      {label: 'China', value: 'CN'},
      {label: 'France', value: 'FR'},
      {label: 'Germany', value: 'DE'},
      {label: 'India', value: 'IN'},
      {label: 'Mexico', value: 'JP'},
      {label: 'Italy', value: 'MX'},
      {label: 'US', value: 'US'},
    ];

    return (
      <Page>
        <Layout>

          <Layout.AnnotatedSection
            title="Application activation"
            description="Click enable to activate app"
          >
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: this.handleToggle,
              }}
              enabled={enabled}
            >
              This setting is{' '}
              <TextStyle variation="strong">{textStatus}</TextStyle>.
            </SettingToggle>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            title="Aliexpress configuration"
            description="You can get the API here"
          >
            <Card sectioned>
              <Form onSubmit={this.handleAliSubmit}>
                <FormLayout>
                  <TextField
                    value={aliApiKey}
                    onChange={this.handleChange('aliApiKey')}
                    label="API key"
                    type="text"
                  />

                  <TextField
                    value={aliTrackingKey}
                    onChange={this.handleChange('aliTrackingKey')}
                    label="Tracking key"
                    type="text"
                  />

                  <TextField
                    value={aliDigitalSign}
                    onChange={this.handleChange('aliDigitalSign')}
                    label="Digital signature"
                    type="text"
                  />

                  <Stack distribution="trailing">
                    <Button primary submit>
                      Save
                    </Button>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection
            title="AWS configuration"
            description="You can get the API here"
          >
            <Card sectioned>
              <Form onSubmit={this.handleAwsSubmit}>
                <FormLayout>
                  <TextField
                    value={awsTag}
                    onChange={this.handleChange('awsTag')}
                    label="Associate Tag"
                    type="text"
                  />

                  <TextField
                    value={awsAccessKey}
                    onChange={this.handleChange('awsAccessKey')}
                    label="Access Key"
                    type="text"
                  />

                  <TextField
                    value={awsSecretKey}
                    onChange={this.handleChange('awsSecretKey')}
                    label="Secret Key"
                    type="text"
                  />

                  <Select
                    label="Marketplace"
                    options={options}
                    onChange={this.handleChange('selected')}
                    value={this.state.selected}
                  />

                  <Stack distribution="trailing">
                    <Button primary submit>
                      Save
                    </Button>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.AnnotatedSection>
          
        </Layout>
      </Page>
    );
  }

  handleAliSubmit = () => {
    this.setState({
      aliApiKey: this.state.aliApiKey,
      aliTrackingKey: this.state.aliTrackingKey,
      aliDigitalSign: this.state.aliDigitalSign
    });
    var config = mongoose.getModel('config');
    config.update(
      {aliApiKey: this.state.aliApiKey},
      {aliTrackingKey: this.state.aliTrackingKey }, 
      {aliDigitalSign: this.state.aliDigitalSign },
    function(err, response){
      console.log(response);
    });
  };

  handleAwsSubmit = () => {
    this.setState({
      awsTag: this.state.awsTag,
      awsAccessKey: this.state.awsAccessKey,
      awsSecretKey: this.state.awsSecretKey,
      selected: this.state.selected
    });
    console.log('submission', this.state);
  };

  handleChange = (field) => {
    return (value) => this.setState({ [field]: value });
  };

  handleToggle = () => {
    this.setState(({ enabled }) => {
      return { enabled: !enabled };
    });
  };
}

export default AnnotatedLayout;
