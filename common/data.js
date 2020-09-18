// 数据格式,数据中只需要包含以下字段和数据格式,开发者可以添加字段,比如id等等,不影响组件显示,
// 组件的返回结果是有菜单数组下标形式返回,
// 如果传入数据中有value,也会返回value,开发者可根据返回的下标获取所选中的菜单
/*
[
	{
		"name":"",	//字符串类型 选填项 菜单名称,如不填,则取第一个子菜单的name值,filter和radio类型则将设置为"筛选"
		"type":""	//字符串类型 必填项 可取值 hierarchy/filter/radio  hierarchy单/多层级菜单(最多三级); filter筛选多选菜单; radio筛选单选菜单
		"submenu":[	//对象数组类型 必填项 子菜单数据
			{
				"name":"",	//字符串类型 必填项 菜单名称
				"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null,filter类型此字段无效果
				"submenu":[	//对象数组类型 必填项 子菜单数据
					{
						"name":"",	//字符串类型 必填项 菜单名称
						"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
						"submenu":[	//对象数组类型 必填项 子菜单数据 filter类型无效 
							{
								"name":"",	//字符串类型 必填项 菜单名称 hierarchy类型层级最多到此
								"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
							}
						]
					}
				]
			}
		]
	}
]
*/

//0.0.4版本起 返回结果将有两部分组成:
/*
{
	index:[],	//旧版本的下标数组形式
	value:[]	//菜单中的valve,结构和下标结果数组一样,只是把下标替换成了value而已
}
*/
// 以下演示数据中,我故意把value设置成跟name一样,只是为了方便演示,使示例更加易懂,实际使用时候value应该是一个标识,给后台识别所用的.
// 数据较长，请仔细查看。
export default [
	{
		"name":'单选',
		"type": 'filter',
		"submenu": [
			{
					"name": "年龄",
					"submenu": [{
							"name": "大龄工(选择后仅显示50+大龄工单)",
							"value": "50"
						}
					]
				},
			{
					"name": "性别",
					"submenu": [{
							"name": "男",
							"value": "0"
						},
						{
							"name": "女",
							"value": "1"
						}
					]
				},
			{
				"name": "管理费方式",
				"submenu": [{
						"name": "长期",
						"value": "0"
					},
					{
						"name": "一次性",
						"value": "1"
					},
				]
			},
			{
				"name": "班制",
				"submenu": [{
						"name": "两班倒",
						"value": "0"
					},
					{
						"name": "长白班",
						"value": "1"
					},
				]
			},
			{
				"name": "夫妻房",
				"submenu": [{
						"name": "有",
						"value": "1"
					}
				]
			},
			{
				"name": "工期要求",
				"submenu": [{
						"name": "长期工",
						"value": "0"
					},
					{
						"name": "短期工",
						"value": "1"
					}
					
				]
			},
			{
				"name": "学生工",
				"submenu": [{
						"name": "可接受",
						"value": "0"
					},	
				]
			},
			{
				"name": "少数名族",
				"submenu": [{
						"name": "可接受",
						"value": "0"
					}				
				]
			}
		]
	}
]

