class ModalExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalAopen: false,
      modalBopen:false,
      promptOpen:false,
    };
  }

  openModal(modalInstance) {
    return () => {
      this.setState({[modalInstance]: true});
    }
  }

  closeModal(modalInstance) {
    return () => {
      this.setState({[modalInstance]: false});
    }
  }

  getModalContent() {
    return (
      <div>
        <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
        <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
      </div>
    )
  }

  render(){
    return (
      <div>
        <div className="slds-p-bottom--medium">
          <SLDSButton label="Open Bare" onClick={this.openModal('modalAopen').bind(this)} variant="brand" />
          <SLDSModal
            align="top"
            isOpen={this.state.modalAopen}
            onRequestClose={this.closeModal('modalAopen')}
            size="large">
              {this.getModalContent()}
          </SLDSModal>
        </div>

        <div className="slds-p-bottom--medium">
          <SLDSButton label="Open Standard" onClick={this.openModal('modalBopen').bind(this)} variant="brand" />
          <SLDSModal
            footer={[
              <SLDSButton label="Cancel" variant="neutral" onClick={this.closeModal('modalBopen').bind(this)} />,
              <SLDSButton label="Save" variant="brand" onClick={this.closeModal('modalBopen').bind(this)} />
            ]}
            isOpen={this.state.modalBopen}
            onRequestClose={this.closeModal('modalBopen')}
            tagline={<span>Tagline goes here.</span>}
            title={<span>My Title</span>}>
              {this.getModalContent()}
          </SLDSModal>
        </div>

        <div className="slds-p-bottom--medium">
          <SLDSButton label="Open Prompt" onClick={this.openModal('promptOpen').bind(this)} variant="brand" />
          <SLDSModal
            footer={[ <SLDSButton label='Got it' variant='neutral' onClick={this.closeModal('promptOpen')} /> ]}
            isOpen={this.state.promptOpen}
            isPassive={false}
            onRequestClose={this.closeModal('promptOpen')}
            prompt='error'
            size='medium'
            title={<span>Service Unavailable</span>}>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.
          </SLDSModal>
        </div>

      </div>
    );
  }

}

React.render(<ModalExample />, mountNode);

