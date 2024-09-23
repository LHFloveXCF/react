import '../static/css/article.css'
import avatar from '../static/images/bozai.png'
import { useRef, useState } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { v1 as uuidv1 } from 'uuid';
import dayjs from 'dayjs'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
    {
        // 评论id
        rpid: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: '',
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 100,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: '黑马前端',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 66,
    },
]
// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
    { type: 'hot', text: '最热' },
    { type: 'time', text: '最新' },
]

const Article = () => {
    const [contentList, setContentList] = useState(_.orderBy(defaultList, 'like', 'desc'))
    const [type, setType] = useState(tabs)

    const [myType, setMyType] = useState('hot')
    const [content, setContent] = useState('')

    const delContent = (id) => {
        setContentList(contentList.filter(item => item.rpid !== id))
    }

    const changeType = (type) => {
        setMyType(type)
        if (type === 'hot') {
            setContentList(_.orderBy(contentList, 'like', 'desc'))
        } else if (type === 'time') {
            setContentList(_.orderBy(contentList, 'ctime', 'desc'))
        }
    }

    const changeContent = (value) => {
        setContent(value)
    }

    const inputRef = useRef(null)

    const publishContent = () => {
        setContentList([
            ...contentList,
            {
                rpid: uuidv1(),
                user: {
                    uid: '30009257',
                    avatar,
                    uname: '黑马前端',
                },
                content: content,
                ctime: dayjs().format('MM-DD HH:mm'),
                like: 66,
            }
        ])
        // 清空输入框
        setContent('')
        // 设置高亮
        inputRef.current.focus()
    }

    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{contentList.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {type.map(item => <span onClick={() => { changeType(item.type) }} key={item.type} className={classNames('nav-item', { active: item.type === myType })}>{item.text}</span>)}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像" />
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                            ref = {inputRef}
                            value={content}
                            onChange={(e) => { changeContent(e.target.value) }}
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            <div className="send-text" onClick={publishContent}>发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {contentList.map(item => (<div key={item.rpid} className="reply-item">
                        {/* 头像 */}
                        <div className="root-reply-avatar">
                            <div className="bili-avatar">
                                <img
                                    src={item.user.avatar}
                                    className="bili-avatar-img"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="content-wrap">
                            {/* 用户名 */}
                            <div className="user-info">
                                <div className="user-name">{item.user.uname}</div>
                            </div>
                            {/* 评论内容 */}
                            <div className="root-reply">
                                <span className="reply-content">{item.content}</span>
                                <div className="reply-info">
                                    {/* 评论时间 */}
                                    <span className="reply-time">{item.ctime}</span>
                                    {/* 评论数量 */}
                                    <span className="reply-time">点赞数:{item.like}</span>
                                    {/* 只有自己的评论才显示删除按钮 */}
                                    {item.user.uid === user.uid && <span onClick={() => delContent(item.rpid)} className="delete-btn">
                                        删除
                                    </span>}
                                </div>
                            </div>
                        </div>
                    </div>))}

                </div>
            </div>
        </div>
    )
}

export default Article