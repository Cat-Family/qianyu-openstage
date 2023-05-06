// move.test.tsx
import renderer from 'react-test-renderer'
import GithubOAuthPage from './GithubOAuth'

// describe 描述一组测试
describe('test Movebox component render', () => {
  it('test Movebox component render success', () => {
    // renderer.create 模拟 React 渲染组件，并将结果输出为 json 字符串。
    const moveComp = renderer
      .create(<GithubOAuthPage></GithubOAuthPage>)
      .toJSON()
    // 期望 moveComp 匹配生成的快照文件。
    expect(moveComp).toMatchSnapshot()
  })
})
