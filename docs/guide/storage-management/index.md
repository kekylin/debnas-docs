# 存储管理
## 1、硬盘管理
通过Cockpit Web管理面板进行管理。
## 2、软Raid管理
通过Cockpit Web管理面板进行管理。
## 3、硬盘自动休眠
hdparm
> 参考：https://manpages.ubuntu.com/manpages/jammy/man8/hdparm.8.html

## 4、硬盘健康监测
SMART是现代硬盘驱动器中的一个系统，旨在报告可能表明即将发生故障的情况。smartmontools是一个免费的软件包，可以监控 SMART 属性并运行硬盘自检。
安装smartmontools：
```
sudo apt install smartmontools
```
检查驱动器的SMART功能
要确保您的驱动器支持 SMART，请键入：
```
sudo smartctl -i /dev/sda 
```
其中 /dev/sda 是你的硬盘。这将为您提供有关驱动器的简要信息。最后两行可能如下所示：
```
SMART support is: Available - device has SMART capability.
SMART support is: Enabled 
```
启用SMART
如果您的驱动器未启用 SMART，您可以通过键入以下内容来启用它：
```
sudo smartctl -s on /dev/sda 
```
检查硬盘整体健康状况
```
sudo smartctl -H /dev/sda
```
此命令应返回：
```
=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED
```
如果它没有返回 PASSED，您应该立即备份所有数据。您的硬盘驱动器可能出现故障。
测试驱动器
您可以在安装驱动器时运行任何类型的测试，尽管性能可能会有所下降。可以在驱动器上进行三种类型的测试：
短
扩展（长）
传输
要查找执行每个测试所需时间的估计值，请键入：
```
sudo smartctl -c /dev/sda 
```
最有用的测试是扩展测试（长）。您可以通过键入以下内容来启动测试：
```
sudo smartctl -t long /dev/sda 
```
结果
您可以通过键入以下内容来查看驱动器的测试统计信息：
```
sudo smartctl -l selftest /dev/sda 
```
要显示 IDE 驱动器的详细 SMART 信息，请键入：
```
sudo smartctl -a /dev/sda
```
要显示 SATA 驱动器的详细 SMART 信息，请键入：
```
sudo smartctl -a -d ata /dev/sda
```
注意：这也适用于通过 SCSI 堆栈运行并显示为 /dev/sdX 的新内核中的 IDE 驱动器
部分字段的含义
```
=== START OF READ SMART DATA SECTION ===
SMART Attributes Data Structure revision number: 16
Vendor Specific SMART Attributes with Thresholds:
ID# ATTRIBUTE_NAME          
  1 Raw_Read_Error_Rate     读取错误率
  3 Spin_Up_Time            起转时间
  4 Start_Stop_Count        启动停止次数
  5 Reallocated_Sector_Ct   重新分配扇区计数
  7 Seek_Error_Rate         寻道错误率
  9 Power_On_Hours          通电时间
 10 Spin_Retry_Count        起转重试次数
 11 Calibration_Retry_Count 重新校准重试次数
 12 Power_Cycle_Count       启动<->关闭循环次数
192 Power-Off_Retract_Count 断电磁头缩回计数
193 Load_Cycle_Count        磁头加载/卸载循环计数
194 Temperature_Celsius     温度
196 Reallocated_Event_Count 在分配扇区物理位置事件计数（与坏道无关）
197 Current_Pending_Sector  当前等待中扇区数（状态存疑/不稳定-等待后续判断）
198 Offline_Uncorrectable   无法修正的扇区总数
199 UDMA_CRC_Error_Count    UltraDMA CRC错误计数
200 Multi_Zone_Error_Rate   写入错误率
```
使用示例：
监测硬盘1
```
/dev/sda -o on -S on  -H -l error -l selftest -f -s (O/../../1/2|S/../../../4|L/../../2/5) -I 194 -W 4,45,55 -R 5 -m yourname@qq.com -M exec /usr/share/smartmontools/smartd-runner
```
监测硬盘2
```
/dev/sdb -o on -S on  -H -l error -l selftest -f -s (O/../../1/2|S/../../../4|L/../../2/5) -I 194 -W 4,45,55 -R 5 -m yourname@qq.com -M exec /usr/share/smartmontools/smartd-runner
```
测试邮件通知
```
/dev/sda -o on -S on  -H -l error -l selftest -f -s (O/../../1/2|S/../../../4|L/../../2/5) -I 194 -W 4,45,55 -R 5 -m yourname@qq.com -M test
```
上述例子来源于`/etc/smartd.conf`：
```
# 第一个 ATA/SATA 或 SCSI/SAS 磁盘。 监控所有属性，启用
# 自动在线数据收集，自动属性自动保存，并
# 每天凌晨 2-3 点开始短的自检，长的自检
# 周六凌晨3-4点之间。
#/dev/sda -a -o on -S on -s (S/./././02|L/././6/03)

# 监控SMART状态、ATA错误日志、自检日志，并跟踪
# 所有属性的变化，除了属性 194
#/dev/sdb -H -l error -l selftest -t -I 194

# 监控所有属性，除了正常化的温度（通常是194）。
# 但跟踪温度变化 >= 4 摄氏度，报告温度
# >= 45 摄氏度和 Reallocated_Sector_Ct (5) 原始值的变化。
# 在SMART故障或温度>=55摄氏度时发送邮件。
#/dev/sdc -a -I 194 -W 4,45,55 -R 5 -m admin@example.com
```
日常使用推荐使用Scrutiny来监测硬盘状态，Scrutiny使用容器部署，支持定时检测，支持邮件通知，支持可视化界面查看。
Scrutiny 是一种硬盘驱动器运行状况仪表板和监控解决方案，将制造商提供的 SMART 指标与实际故障率相结合。用于 smartd SMART 监控的 WebUI

> 项目地址：https://github.com/AnalogJ/scrutiny

> 安装教程：https://www.tauceti.blog/posts/easy-hard-disk-health-monitoring-with-scrutiny-and-smart/

> 安装教程：https://blog.csdn.net/wbsu2004/article/details/124095004

## 5、安装联合文件系统
mergerfs是一个联合文件系统，旨在简化跨众多商品存储设备的文件存储和管理。它类似于mhddfs、unionfs和aufs。

> 项目地址：https://github.com/trapexit/mergerfs

> 参考：https://blog.csdn.net/linkyy5/article/details/126080546

## 5、安装SnapRaid
> 官网：http://www.snapraid.it/

> 参考：https://wiki.archlinux.org/title/SnapRAID