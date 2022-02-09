import React, {Component} from "react";

class LifeCycleSample extends Component {
    state = {
        number:0,
        color:null,
    }

    myRef = null;


    constructor(props){
        super(props);
        console.log('constructor')
    }
    // 이것은 컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행됩니다. 
    // 이 메서드에서는 초기 state를 정할 수 있습니다.

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps');
        if(nextProps.color !== prevState.color) {
            return { color: nextProps.color };
          }
          return null;
        }

    // 이것은 리액트 v16.3 이후에 새로 만든 라이프사이클 메서드입니다. 
    // props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, 
    // 컴포넌트가 마운트될 때와 업데이트될 때 호출됩니다.

    componentDidMount() {
        console.log('componentDidMount');
        }
    // 이것은 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행합니다.
    // 이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나 
    // 이벤트 등록, setTimeout, setInterval, 
    // 네트워크 요청 같은 비동기 작업을 처리하면 됩니다.

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState);
        // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
        return nextState.number % 10 !== 4;
      }
    // 이것은 props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드입니다. 
    // 메서드에서는 반드시 true 값 또는 false 값을 반환해야 합니다. 
    // 컴포넌트를 만들 때 이 메서드를 따로 생성하지 않으면 기본적으로 언제나 true 값을 반환합니다. 
    // 이 메서드가 false 값을 반환한다면 업데이트 과정은 여기서 중지됩니다.

    // 이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근하고,
    // 새로 설정될 props 또는 state는 nextProps와 nextState로 접근할 수 있습니다.

    // 프로젝트 성능을 최적화할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 false 값을 반환하게 합니다.
    
    componentWillUnmount() {
        console.log('omponentWillUnmount');
      }
    // 이것은 컴포넌트를 DOM에서 제거할 때 실행합니다. componentDidMount에서 등록한 
    // 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 합니다.

    handleClick = () => {
        this.setState({
          number: this.state.number + 1
        });
      }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
        if(prevProps.color !== this.props.color) {
          return this.myRef.style.color;
        }
        return null;
      }
    // 이것은 리액트 v16.3 이후 만든 메서드입니다. 이 메서드는 render에서 만들어진 결과물이
    // 브라우저에 실제로 반영되기 직전에 호출됩니다. 이 메서드에서 반환하는 값은
    // componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달받을 수 있는데요.
    // 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용됩니다

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', prevProps, prevState);
        if(snapshot) {
          console.log('업데이트되기 직전 색상: ', snapshot);
        }
      }
    // 이것은 리렌더링을 완료한 후 실행합니다. 업데이트가 끝난 직후이므로, 
    // DOM 관련 처리를 해도 무방합니다. 여기서는 prevProps 또는 prevState를 사용하여 컴포넌트가
    // 이전에 가졌던 데이터에 접근할 수 있습니다. 또 getSnapshotBeforeUpdate에서 
    // 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있습니다.

    render() {
        console.log('render');
    
    
    
        const style = {
          color: this.props.color
        };
    
    
    
        return (
          <div>
            <h1 style={style} ref={ref => this.myRef=ref}>
              {this.state.number}
            </h1>
            <p>color: {this.state.color}</p>
            <button onClick={this.handleClick}>
              더하기
            </button>
          </div>
        )
      }
    // 이 메서드는 매우 익숙하지요? 이 메서드는 컴포넌트 모양새를 정의합니다. 
    // 그렇기에 컴포넌트에서 가장 중요한 메서드라고 할 수 있죠. 라이프사이클 메서드 중 유일한 필수 메서드이기도 합니다.

    // 이 메서드 안에서 this.props와 this.state에 접근할 수 있으며, 리액트 요소를 반환합니다.
    // 요소는 div 같은 태그가 될 수도 있고, 따로 선언한 컴포넌트가 될 수도 있습니다.
    // 아무것도 보여 주고 싶지 않다면 null 값이나 false 값을 반환하도록 하세요.

    // 그리고 다음 사항에 주의하세요. 이 메서드 안에서는 이벤트 설정이 아닌 곳에서
    // setState를 사용하면 안 되며, 브라우저의 DOM에 접근해서도 안 됩니다. 
    // DOM 정보를 가져오거나 state에 변화를 줄 때는 componentDidMount에서 처리해야 합니다.

}

export default LifeCycleSample;