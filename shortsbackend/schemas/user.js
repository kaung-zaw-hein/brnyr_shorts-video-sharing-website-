export default {
    name: 'user',
    title: 'user',
    type: 'document',
    fields: [
        {
            name:'userName',
            title:'User Name',
            type:'string'
        },
        {
            name:'image',
            title:'Image',
            type:'image',
            options: {
                hotspot: true,
            },
        }
    ]
}