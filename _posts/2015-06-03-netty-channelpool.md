---
layout: post
title: Netty Channel Pool
date: '2015-06-03T16:32:00-08:00'
categories: Technology
tags: Netty ChannelPool
comments: true
---
Netty released ChannelPool in their most version 4.0.28 release: http://netty.io/news/2015/05/07/4-0-28-Final.html

While trying to use the pool, I came across an issue where the Channel pipeline was not getting initialized with the ChannelInitilizer setup in the Bootstrap.

Here is my initial implementation:
{% gist 8046e804d8b58a65cf8e %}
Output:
<code>DefaultChannelPipeline{}</code>

After many hours of debugging found out that it is meant to be like this bt design. Here is link to the issue on Github: https://github.com/netty/netty/issues/3770

Channel Pool provides an event listener called ChannelPoolHandler to capture pool events. ChannelPoolHandler handler can be implemented to handle events such as channel creation, channel acquisition, channel release etc. Modified the above code to initialize the Channel pipeline on channel creation, which works fine.

Here is the code snippet for initializing Channel within the ChannelPoolHandler:
{% gist 522e2556d2f119e26319 %}
Output:
<code>DefaultChannelPipeline{(ProtobufVarint32FrameDecoder#0 =
    io.netty.handler.codec.protobuf.ProtobufVarint32FrameDecoder),
   (ProtobufDecoder#0 = io.netty.handler.codec.protobuf.ProtobufDecoder),
   (ProtobufVarint32LengthFieldPrepender#0 =
     io.netty.handler.codec.protobuf.ProtobufVarint32LengthFieldPrepender),
   (ProtobufEncoder#0 = io.netty.handler.codec.protobuf.ProtobufEncoder),
   (LogClientHandler#0 = com.pubmatic.ripple.client.LogClientHandler)}
</code>
